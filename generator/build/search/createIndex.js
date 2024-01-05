const FlexSearch = require("flexsearch");
const fs = require('fs');
const {readdir} = require('fs').promises;

const htmlFilesDir = `${__dirname}/../../_site`;

String.prototype.stripHtmlTags = function () {
    return this.replace(/<\/?[^>]+(>|$)/g, " ");
}

const getHtmlFiles = async (dir) =>
    await Promise.all(
        (await readdir(dir, {withFileTypes: true}))
            // filter out non-html files and tags documents
            .filter(file => file.name.includes('.html') && !file.name.includes('tags-'))
            .map(file => file.name)
    );

(async () => {
    let index = new FlexSearch.Document({
        document: {
            id: 'number',
            index: ['content', 'headers', 'title']
        },
        charset: "latin",
        tokenize: "full",
        matcher: "simple",
        cache: true
    })

    const htmlFiles = await getHtmlFiles(htmlFilesDir);
    for (const key in htmlFiles) {
        const htmlContent = fs.readFileSync(`${htmlFilesDir}/${htmlFiles[key]}`).toString();
        const htmlContentMatch = htmlContent.match(/<div class="article">([\s\S]*?)<div class="footer-top">/gm);
        const titleMatch = htmlContent.match(/<h1 id="top">([\s\S]*?)<\/h1>/gm);
        const headersMatch = htmlContent.match(/<h[1-6].*?id.*?>(.*?)<\/h[1-6]>/gm);

        if (htmlContentMatch == null || titleMatch == null) continue;
        const title = titleMatch[0].stripHtmlTags().trim();
        let document = {
            number: key, // use sequential number as key to reduce search index size
            content: htmlContentMatch[0]
                .stripHtmlTags()
                .replace(/\s\s+/g, ' ')
                .replace(/\n/g, " ")
                .replace('Suggest changes', ''),
            title,
            headers: title,
            headersMap: {'top': title}
        };

        if (headersMatch) {
            headersMatch.map((header) => {
                const idMatch = header.match(/id="(.*?)"/i);
                document.headersMap[idMatch[1]] = header.stripHtmlTags();
                document.headers += ` ${header.stripHtmlTags()}`;
            });
        }

        let breadCrumbs = '';
        const breadCrumbsMatch = htmlContent.match(/<div id="breadcrumbs">([^]*?)<\/div>/gm);
        if (breadCrumbsMatch != null) {
            breadCrumbs = breadCrumbsMatch[0].replace(/\s\s+/g, ' ').replace(/\n/g, " ");
        }

        fs.writeFileSync(`${__dirname}/searchIndex/documents/${key}.json`, JSON.stringify({
            ...document,
            uri: (htmlFiles[key]),
            breadCrumbs
        }));
        index.add(document)
    }

    index.export((key, data) => fs.writeFileSync(`${__dirname}/searchIndex/${key}.json`, data || ''));
})();
