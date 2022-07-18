const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>, { setAnchorElNav }: any) => {
  setAnchorElNav(event.currentTarget);
};
const handleCloseNavMenu = (event: React.MouseEvent<HTMLElement>, { setAnchorElNav }: any) => {
  setAnchorElNav(null);
};

export const header = {
  position: 'static',
  maxWidth: 'xl',
  disableGutters: true,
  color: 'transparent',
  items: [
    {
      type: 'typography',
      variant: 'h6',
      noWrap: true,
      component: 'a',
      href: '/',
      sx: {
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
      },
      label: 'TITLE',
    },
    {
      type: 'box',
      sx: {
        flexGrow: 1,
        display: {
          xs: 'flex',
          md: 'none',
        },
      },
      items: [
        {
          type: 'iconButton',
          size: 'large',
          color: 'inherit',
          iconColor: 'grey',
          icon: 'MenuIcon',
          onClick: handleOpenNavMenu,
        },
        {
          type: 'menu',
          id: 'menu-appbar',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
          },
          keepMounted: true,
          transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
          },
          onClose: handleCloseNavMenu,
          sx: {
            display: { xs: 'block', md: 'none' },
          },
          items: [{
            type: 'typography',
            label: 'STAKING.TITLE',
            textAlign: 'center'
          }]
        }
      ],
    },
    {
      type: 'box',
      sx: {
        flexGrow: 1,
      },
      items: []
    },
    {
      type: 'box',
      sx: {
        flexGrow: 0,
      },
      items: [{
        type: 'link',
        icon: 'TwitterIcon',
        iconColor: 'grey',
        sx: {
          textDecoration: 'none',
          mr: 2,
        },
        href: 'https://twitter.com/****'
      }, {
        type: 'link',
        icon: 'DiscordIcon',
        iconColor: 'grey',
        sx: {
          textDecoration: 'none',
          mr: 2,
        },
        href: 'https://discord.com/****'
      }, {
        type: 'wallet'
      }]
    }
  ],
};
