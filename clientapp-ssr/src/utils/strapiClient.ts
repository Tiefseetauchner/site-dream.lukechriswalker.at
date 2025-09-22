import { API, CollectionTypeManager, FilesManager, SingleTypeManager, strapi, StrapiClient } from "@strapi/client";

const runWithRetries = async <T>(fn: () => Promise<T>, retries: number | undefined, maxRetries: number): Promise<T> => {
  if (!retries) {
    retries = maxRetries;
  }

  try {
    return await fn();
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... (${retries} retries left)`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return runWithRetries(fn, retries - 1, maxRetries);
    } else {
      throw error;
    }
  }
};

interface ICollectionTypeManager {
  find(queryParams?: API.BaseQueryParams): Promise<API.DocumentResponseCollection>;
  findOne(documentID: string, queryParams?: API.BaseQueryParams): Promise<API.DocumentResponse>;
  create(data: Record<string, unknown>, queryParams?: API.BaseQueryParams): Promise<API.DocumentResponse>;
  update(documentID: string, data: Record<string, unknown>, queryParams?: API.BaseQueryParams): Promise<API.DocumentResponse>;
  delete(documentID: string, queryParams?: API.BaseQueryParams): Promise<void>;
}

class RetryingCollectionTypeManagerAdapter implements ICollectionTypeManager {
  private manager: CollectionTypeManager;
  private retries: number | undefined;
  private maxRetries: number;

  constructor(manager: CollectionTypeManager, retries = undefined, maxRetries = 5) {
    this.manager = manager;
    this.retries = retries;
    this.maxRetries = maxRetries;
  }

  find(queryParams?: API.BaseQueryParams): Promise<API.DocumentResponseCollection> {
    return runWithRetries(() => this.manager.find(queryParams), this.retries, this.maxRetries);
  }

  findOne(documentID: string, queryParams?: API.BaseQueryParams): Promise<API.DocumentResponse> {
    return runWithRetries(() => this.manager.findOne(documentID, queryParams), this.retries, this.maxRetries);
  }

  create(data: Record<string, unknown>, queryParams?: API.BaseQueryParams): Promise<API.DocumentResponse> {
    return runWithRetries(() => this.manager.create(data, queryParams), this.retries, this.maxRetries);
  }

  update(documentID: string, data: Record<string, unknown>, queryParams?: API.BaseQueryParams): Promise<API.DocumentResponse> {
    return runWithRetries(() => this.manager.update(documentID, data, queryParams), this.retries, this.maxRetries);
  }

  delete(documentID: string, queryParams?: API.BaseQueryParams): Promise<void> {
    return runWithRetries(() => this.manager.delete(documentID, queryParams), this.retries, this.maxRetries);
  }
}

interface ISingleTypeManager {
  find(queryParams?: API.BaseQueryParams): Promise<API.DocumentResponse>;
  update(data: Record<string, unknown>, queryParams?: API.BaseQueryParams): Promise<API.DocumentResponse>;
  delete(queryParams?: API.BaseQueryParams): Promise<void>;
}

class RetryingSingleTypeManagerAdapter implements ISingleTypeManager {
  private manager: SingleTypeManager;
  private retries: number;
  private maxRetries: number;

  constructor(manager: SingleTypeManager, retries = 3, maxRetries = 5) {
    this.manager = manager;
    this.retries = retries;
    this.maxRetries = maxRetries;
  }

  find(queryParams?: API.BaseQueryParams): Promise<API.DocumentResponse> {
    return runWithRetries(() => this.manager.find(queryParams), this.retries, this.maxRetries);
  }

  update(data: Record<string, unknown>, queryParams?: API.BaseQueryParams): Promise<API.DocumentResponse> {
    return runWithRetries(() => this.manager.update(data, queryParams), this.retries, this.maxRetries);
  }

  delete(queryParams?: API.BaseQueryParams): Promise<void> {
    return runWithRetries(() => this.manager.delete(queryParams), this.retries, this.maxRetries);
  }
}

class RetryingStrapiClientAdapter {
  private client: StrapiClient;
  private retries: number;
  private maxRetries: number;
  files: FilesManager;

  constructor(client: StrapiClient, retries = 3, maxRetries = 5) {
    this.client = client;
    this.retries = retries;
    this.maxRetries = maxRetries;

    this.files = client.files;
  }

  get baseURL(): string {
    return this.client.baseURL;
  }

  fetch(url: string, init?: RequestInit): Promise<Response> {
    return runWithRetries(() => this.client.fetch(url, init), this.retries, this.maxRetries);
  }

  collection(resource: string): ICollectionTypeManager {
    return new RetryingCollectionTypeManagerAdapter(this.client.collection(resource), this.retries, this.maxRetries);
  }

  single(resource: string): ISingleTypeManager {
    return new RetryingSingleTypeManagerAdapter(this.client.single(resource), this.retries, this.maxRetries);
  }
}

export const client = (apiUrl?: string, apiToken?: string) => {
  const API_URL = apiUrl || process.env.API_URL;
  const API_TOKEN = apiToken || process.env.API_TOKEN;

  const strapiClient = strapi({
    baseURL: API_URL + "/api",
    auth: API_TOKEN,
  });

  return new RetryingStrapiClientAdapter(strapiClient);
};

export function resolveMedia(url: string): string {
  const API_URL = process.env.API_URL;

  if (!url) return "";
  return url.startsWith("/") ? API_URL + url : url;
}
