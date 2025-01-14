/*
 * @Date: 2025-01-03 17:15:45
 * @Description: description
 */
import puppeteer from 'puppeteer';

const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
        width: 0,
        height: 0
    }
});

const page = await browser.newPage();

await page.goto('https://www.zhipin.com/web/geek/job?query=前端&city=101210100'); // 杭州的

await page.waitForSelector('.job-list-box'); // 等待页面加载完成, job-list-box元素出现



const totalPage = await page.$eval('.options-pages a:nth-last-child(2)', e => {
    return parseInt(e.textContent)
});

const allJobs = [];

for (let i = 1; i <= totalPage; i++) {
    await page.goto('https://www.zhipin.com/web/geek/job?query=前端&city=101210100&page=' + i);

    await page.waitForSelector('.job-list-box'); // 等待页面加载完成, job-list-box元素出现

    const jobs = await page.$eval('.job-list-box', el => {
        return [...el.querySelectorAll('.job-card-wrapper')].map(item => {
            return {
                job: {
                    name: item.querySelector('.job-name').textContent,
                    area: item.querySelector('.job-area').textContent,
                    salary: item.querySelector('.salary').textContent
                },
                
                link: item.querySelector('a').href,
                company: {
                    name: item.querySelector('.company-name').textContent,
                }
            }
        })
    });
    allJobs.push(...jobs);
}
console.log(allJobs);

for(let i = 0; i < allJobs.length; i++) {
    await page.goto(allJobs[i].link);

    try {
        await page.waitForSelector('.job-sec-text'); // 等待页面加载完成, job-sec-text元素出现，跳到更加详细的页面

        const jd = await page.$eval('.job-sec-text', el => {
            return el.textContent
        });

        allJobs[i].desc = jd;

        console.log(allJobs[i]);
    } catch(e) {}
}
