import json

file_path = r"C:\Users\Somya\Desktop\Cacto\src\utils\temp_rewrite\batch_11.json"
with open(file_path, "r", encoding="utf-8") as f:
    data = json.load(f)

# Blog 1 Replacements
c1 = data[0]["content"]
replacements_1 = {
    'crafting a witty caption': 'crafting a witty <a href="/tools/caption-generator">caption</a>',
    'link in bio': '<a href="/blog/bypassing-link-in-bio-click-hurdles">link in bio</a>',
    'comment-to-DM flow': '<a href="/blog/how-to-automate-instagram-dms-safely">comment-to-DM flow</a>',
    'lead magnet': '<a href="/tools/lead-value-estimator">lead magnet</a>',
    'views but no sales trap': '<a href="/blog/why-manychat-alternatives-are-rising">views but no sales trap</a>'
}
for k, v in replacements_1.items():
    c1 = c1.replace(k, v, 1)
data[0]["content"] = c1

# Blog 2 Replacements
c2 = data[1]["content"]
replacements_2 = {
    'getting likes and comments': 'getting <a href="/blog/definitive-guide-instagram-comment-auto-reply">likes and comments</a>',
    'Direct Share': '<a href="/blog/why-story-mention-automations-are-next-big-growth-hack">Direct Share</a>',
    'DM automation': '<a href="/blog/how-to-automate-instagram-dms-safely">DM automation</a>',
    'capture leads': '<a href="/blog/turn-cold-instagram-comments-into-high-paying-leads">capture leads</a>',
    'going viral': '<a href="/tools/post-booster">going viral</a>'
}
for k, v in replacements_2.items():
    c2 = c2.replace(k, v, 1)
data[1]["content"] = c2

# Blog 3 Replacements
c3 = data[2]["content"]
replacements_3 = {
    'DM automation space': '<a href="/blog/how-to-automate-instagram-dms-safely">DM automation space</a>',
    'testing hooks': 'testing <a href="/tools/hook-generator">hooks</a>',
    'deliver lead magnets': 'deliver <a href="/blog/how-to-setup-automated-lead-magnet-funnel">lead magnets</a>',
    'run complex sales funnels': '<a href="/blog/blueprint-scaling-sales-comments-to-checkout">run complex sales funnels</a>',
    'Manychat alternative': '<a href="/blog/why-manychat-alternatives-are-rising">Manychat alternative</a>'
}
for k, v in replacements_3.items():
    c3 = c3.replace(k, v, 1)
data[2]["content"] = c3

with open(file_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("JSON successfully updated with internal links.")
