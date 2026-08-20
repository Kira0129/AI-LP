import re

def main():
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            content = f.read()

        # Find Trouble section
        trouble_match = re.search(r'(    <section id="trouble".*?</section>\n)', content, re.DOTALL)
        if not trouble_match:
            print('Trouble section not found')
            return
        trouble_section = trouble_match.group(1)

        # Find About section
        about_match = re.search(r'(    <section id="about".*?</section>\n)', content, re.DOTALL)
        if not about_match:
            print('About section not found')
            return
        about_section = about_match.group(1)

        # Remove trouble section
        content = content.replace(trouble_section + '\n', '')
        content = content.replace(trouble_section, '')

        # Insert trouble section after about section
        about_pos = content.find(about_section)
        if about_pos == -1:
            print('About section lost')
            return
        insert_pos = about_pos + len(about_section)

        # Change trouble section background to bg-orange-light
        trouble_section_mod = trouble_section.replace('class="py-24 bg-gray-base"', 'class="py-24 bg-orange-light"')
        # Also change the bg-orange-light inside the cards to bg-white so they stand out against the light orange bg
        # Wait, the cards are currently bg-white and inside there are icons with bg-orange-light. That is fine, or we can leave as is.
        # Let's just adjust the section bg.

        content = content[:insert_pos] + '\n' + trouble_section_mod + content[insert_pos:]

        # Update Scroll Icon href
        # Only replace the first occurrence which is in the hero section
        content = content.replace('href="#trouble"', 'href="#about"', 1)

        # Update nav links (PC)
        pc_nav_pattern = r'(<a href="#trouble"[\s\S]*?>お悩み</a>\s*)(<a href="#about"[\s\S]*?>当社の強み</a>)'
        content = re.sub(pc_nav_pattern, r'\2\n                \1', content)

        # Update nav links (Mobile)
        sp_nav_pattern = r'(<a href="#trouble" class="block px-3 py-3\.5 font-bold text-gray-800 border-b border-gray-100">お悩み</a>\s*)(<a href="#about" class="block px-3 py-3\.5 font-bold text-gray-800 border-b border-gray-100">当社の強み</a>)'
        content = re.sub(sp_nav_pattern, r'\2\n                \1', content)

        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(content)
            
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    main()
