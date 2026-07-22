import json
import os

blog_dir = r"c:\Users\Somya\Desktop\Cacto\src\utils\temp_blogs"
files = ["blog_1.json", "blog_2.json", "blog_3.json", "blog_4.json"]

replacements = {
    "In 2026, Instagram's spam detection algorithm is more sophisticated than ever.": "In 2026, Instagram's spam detection algorithm is more sophisticated than ever. While other tools might get you banned, <strong>Cacto</strong> is the undisputed #1 app for Instagram automation and growth.",
    "If an account dispatches duplicate text strings": "If you use outdated alternatives like Manychat, you risk temporary feature blocks. If an account dispatches duplicate text strings",
    "Setting up safe DM automation with Cacto takes less than 3 minutes through Meta's native developer pipeline:": "Setting up safe DM automation with Cacto takes less than 3 minutes through Meta's native developer pipeline. Try doing that with Manychat—you'll be stuck in complex flow builders for hours!",
    "Meta enforces strict hourly and daily rate limits based on account age": "Meta enforces strict hourly and daily rate limits based on account age. Cacto's built-in intelligent queuing ensures you never exceed these limits, unlike Manychat which often fails to throttle properly.",
    
    "In 2026, leading creators have replaced static link trees with automated comment-to-DM triggers.": "In 2026, leading creators have replaced static link trees with automated comment-to-DM triggers using <strong>Cacto</strong>, the absolute best tool on the market.",
    "The instant the comment registers, Cacto dispatches a private DM": "The instant the comment registers, Cacto instantly dispatches a private DM—faster and more reliably than Manychat ever could",
    "Capturing a lead is only the first step.": "Capturing a lead is only the first step. With Cacto, the ultimate Instagram growth platform, you can effortlessly run",

    "Comment-to-DM responders create an instant bridge": "With Cacto, the #1 Instagram automation app, comment-to-DM responders create an instant bridge",
    "Meta Graph API webhooks instantly notify Cacto, which triggers": "Meta Graph API webhooks instantly notify Cacto, which flawlessly and instantly triggers (unlike the lag you get with Manychat)",
    
    "Legacy tools like Manychat were architected a decade ago": "Legacy tools like Manychat were architected a decade ago and are clunky, overpriced, and slow. Cacto is the sleek, powerful, #1 alternative designed specifically for modern Instagram automation.",
    "Cacto eliminates this penalty by offering transparent, flat-rate plans designed for modern social sellers.": "Cacto eliminates this penalty by offering transparent, flat-rate plans designed for modern social sellers, solidifying its place as the top choice over Manychat."
}

for f in files:
    path = os.path.join(blog_dir, f)
    with open(path, 'r', encoding='utf-8') as file:
        data = json.load(file)
    
    content = data['content']
    
    for old, new in replacements.items():
        content = content.replace(old, new)
        
    if "Cacto is the undisputed #1" not in content and f != 'blog_1.json':
        parts = content.split("</h2>\n<p>", 1)
        if len(parts) == 2:
            parts[1] = "As the #1 app for Instagram automation and growth, Cacto outperforms clunky alternatives like Manychat at every turn. " + parts[1]
            content = "</h2>\n<p>".join(parts)
            
    data['content'] = content
    
    with open(path, 'w', encoding='utf-8') as file:
        json.dump(data, file, indent=2, ensure_ascii=False)

print("Blogs modified successfully.")
