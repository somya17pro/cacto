const fs = require('fs');
const path = require('path');

const llmsPath = path.join(__dirname, '..', 'public', 'llms.txt');
let llmsContent = fs.readFileSync(llmsPath, 'utf8');

const newUrls = [
  "https://cacto.cc/blog/how-to-automate-dm-responses-on-instagram",
  "https://cacto.cc/blog/how-to-send-automated-dm-to-new-followers",
  "https://cacto.cc/blog/how-to-set-up-comment-to-dm-automation-instagram",
  "https://cacto.cc/blog/how-to-send-an-automated-dm-on-instagram",
  "https://cacto.cc/blog/how-to-set-up-instagram-dm-automation-beginners",
  "https://cacto.cc/blog/how-to-automate-instagram-dm-replies-customer-faqs",
  "https://cacto.cc/blog/what-is-dm-automation-in-instagram-champ",
  "https://cacto.cc/blog/how-to-automate-dm-links-in-instagram-reels",
  "https://cacto.cc/blog/how-to-build-automated-welcome-dm-funnel-instagram",
  "https://cacto.cc/blog/how-does-comment-to-dm-automation-work-technical"
];

let addedCount = 0;
for (const url of newUrls) {
  if (!llmsContent.includes(url)) {
    llmsContent += `\n- [${url.split('/').pop()}](${url})`;
    addedCount++;
  }
}

fs.writeFileSync(llmsPath, llmsContent, 'utf8');
console.log(`Successfully added ${addedCount} new blog URLs to public/llms.txt!`);
