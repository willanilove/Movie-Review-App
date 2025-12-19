import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from "@tabler/icons-react";
import { ActionIcon, Anchor, Group } from "@mantine/core";
// import { MantineLogo } from "@mantinex/mantine-logo";

// Update later
const links = [
  { link: "#", label: "Contact" },
  { link: "#", label: "Privacy" },
  { link: "#", label: "Blog" },
  { link: "#", label: "Store" },
  { link: "#", label: "Careers" },
];

function Footer() {
  // Map through links & create anchor tags
  const items = links.map((link) => (
    <Anchor c="dimmed" key={link.label} href={link.link} lh={1} onClick={(event) => event.preventDefault()} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div className="footer">
      <div className="inner">
        {/* <MantineLogo size={28} /> */}

        <Group className="links">{items}</Group>

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
