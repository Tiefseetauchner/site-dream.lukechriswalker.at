import { Container } from "react-bootstrap";
import { usePageMeta } from "../PageMetaContext";
import { routes } from "../../utils/routes";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export function LicensePage() {
  const { setPageMeta } = usePageMeta();

  useEffect(() => {
    setPageMeta({
      title: "Licenses",
      description:
        "This page contains the licenses for the various components used on this website.",
    });
  });

  return (
    <Container>
      <p>
        While it may seem simple to license a book series, I decided to make it
        all but. The licensing is complex and interwoven, and I need and want to
        explain it as much detail as possible.
      </p>
      <h2 id="source">The source code of this website and Licensing thereof</h2>
      <p>
        This is by far the simplest part. This website's source code, available
        on{" "}
        <a href="https://github.com/Tiefseetauchner/site-dream.lukechriswalker.at">
          https://github.com/Tiefseetauchner/site-dream.lukechriswalker.at
        </a>
        , is licensed under the MIT license. The license is available at{" "}
        <a href="https://github.com/Tiefseetauchner/site-dream.lukechriswalker.at/blob/main/LICENSE">
          https://github.com/Tiefseetauchner/site-dream.lukechriswalker.at/blob/main/LICENSE
        </a>
        . For your convenience, the license is also included below, however, I
        do not take liability for any errors in the below text - it serves as
        just a helpful reference. This local copy is provided for convenience;
        please refer to the official license file for the authoritative version.
        The license is as follows:
        <pre style={{ whiteSpace: "pre-wrap" }}>
          MIT License Copyright (c) 2025 Lena Tauchner <br />
          Permission is hereby granted, free of charge, to any person obtaining
          a copy of this software and associated documentation files (the
          "Software"), to deal in the Software without restriction, including
          without limitation the rights to use, copy, modify, merge, publish,
          distribute, sublicense, and/or sell copies of the Software, and to
          permit persons to whom the Software is furnished to do so, subject to
          the following conditions: The above copyright notice and this
          permission notice shall be included in all copies or substantial
          portions of the Software. <br />
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
          IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
          CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
          TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
          SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
        </pre>
      </p>
      <h2 id="contents">
        The <em>contents</em> of this website and images therein
      </h2>
      <p>
        The "contents" of this website are defined as the text, images, and
        other media not directly included in the source code. This includes but
        is not limited to:
        <ul>
          <li>
            The texts displayed on this website which are loaded from an
            external source (e.g. a content management system);
          </li>
          <li>Images and other media displayed on this website</li>
        </ul>
      </p>
      <p>
        The contents of this website are copyrighted by Lena Tauchner. You are{" "}
        <em>not</em> granted a license for redistribution, modification, or use
        of the contents of this website without explicit permission from Lena
        Tauchner. Lena Tauchner reserves all the rights to all materially
        relevant contents of this website.
      </p>
      <p>Copyright © 2025 Lena Tauchner.</p>
      <h2 id="works">Works displayed on this website</h2>
      <p>
        The works displayed but not included on the website may be distributed
        under a various host of licenses. Among these licenses are the Creative
        Commons licenses, specifically the CC BY-NC-ND 4.0 international
        license. The text can be found at{" "}
        <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
          https://creativecommons.org/licenses/by-nc-nd/4.0/
        </a>
        . Keep in mind, this by default{" "}
        <em>prohibits the publication of derivative works</em> (regardless of
        local legal exceptions). This was primarily done to protect the rights
        of the rightholders. However, it does mean that - unless permission is
        explicitly granted - derivative works are not allowed. This includes but
        is not limited to
        <ul>
          <li>modified copies of the works;</li>
          <li>fan art;</li>
          <li>and fan fiction.</li>
        </ul>
        If you wish to use any works displayed on this website beyond what the
        license allows, you must obtain permission from the rightsholder. This
        is usually the author of the work, who you can contact directly or via
        the website's publisher (see{" "}
        <Link to={routes.contact}>the contact page</Link>).
        <br /> If you are unsure whether your intended use is permitted, please
        don't hesitate to reach out!
      </p>
      <h2 id="software">Third party components and software</h2>
      <h3>Font Software</h3>
      <p>
        This website uses externally licensed font software that is bundled with
        the webpage. The following fonts are used:
        <ul>
          <li>
            Cormorant:
            <br />
            This font software is licensed under the{" "}
            <a href="/fonts/LICENSE.Cormorant.txt">
              SIL OPEN FONT LICENSE Version 1.1
            </a>
            . <a href="https://github.com/CatharsisFonts/Cormorant">Github</a>
          </li>
          <li>
            TT2020:
            <br />
            This font software is licensed under the{" "}
            <a href="/fonts/LICENSE.TT2020.txt">
              SIL OPEN FONT LICENSE Version 1.1
            </a>
            . <a href="https://github.com/ctrlcctrlv/TT2020">Github</a>
          </li>
        </ul>
      </p>
      <h3>Software components</h3>
      <p>
        Please refer to{" "}
        <a href="/third-party-licenses.txt">third-party-licenses.txt</a>
        in the repository for more information.
      </p>
    </Container>
  );
}
