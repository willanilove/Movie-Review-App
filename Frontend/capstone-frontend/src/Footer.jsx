import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import { ActionIcon, Anchor, Group } from "@mantine/core";

// Footer links
const links = [
  { link: "#", label: "Contact Us" },
  { link: "#", label: "Privacy Policy" },
  { link: "#", label: "About ReelTalk" },
  { link: "#", label: "Submit Feedback" },
];

function Footer() {
  // Render each footer link as an anchor tag
  const items = links.map((link) => (
    <Anchor c="dimmed" key={link.label} href={link.link} lh={1} onClick={(event) => event.preventDefault()} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div className="footer">
      <div className="inner">
        {/* Footer nav links */}
        <Group className="links">{items}</Group>

        {/* Dummy social media icons */}
        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube size={18} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram size={18} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}

export default Footer;
