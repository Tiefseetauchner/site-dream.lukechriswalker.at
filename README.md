# Cockpit CMS React SPA Template

This is a template I created to help me create more cockpit websites. It includes a few features that I find useful.

## Features

- A template React SPA with crawling prerendering
- Static files to configure apache
- Deployment Scripts
- Cockpit as a submodule

## Usage

The clientapp is created and managed by bun. Install bun first.

Duplicate "deploy.sh.template" and rename to "deploy.sh" and edit the variables to resolve the TODOs. rsync will copy the files to the server.

At this point, you may deploy the site by running `./deploy.sh`. Go through the cockpit installation process, log in and **change your password**.

Navigate to `https://tutorial.lukechriswalker.at/admin/system/api/openapi` and save the file in your clientapp directory as openapi.yml.

Run `bun run openapi-ts` to generate the typescript client for the API.

Now you can create your models in Cockpit and use the client to interact with the API.

If you don't want to use prerendering, comment the corresponding lines in `package.sh` and `staticfiles/.htaccess`.

The `.htaccess` file is already set up to be able to use the SiteMapper plugin if you so desire, you'll have to follow the instructions at https://github.com/Tiefseetauchner/cockpit-cms-sitemapper.

## License

This project is licensed under the MIT License.

## Coffee

I need more coffee. Please.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/tiefseetauchner)
