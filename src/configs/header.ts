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
            textAlign: 'center',
            sx: {
              px: 2
            }
          }]
        }
      ],
    },
    {
      type: 'grid',
      spacing: 2,
      sx: {
        justifyContent: 'flex-end'
      },
      items: [
        {
          type: 'gridItem',
          xs: 6,
          sx: {
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
          },
          items: [{
            type: 'typography',
            variant: 'h6',
            noWrap: true,
            component: 'a',
            href: '/',
            sx: {
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            },
            label: 'TITLE',
          }]
        },
        {
          type: 'gridItem',
          xs: 6,
          sx: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          },
          items: [{
            type: 'link',
            icon: 'TwitterIcon',
            iconColor: 'grey',
            sx: {
              textDecoration: 'none',
              mr: 2,
              verticalAlign: 'middle'
            },
            href: 'https://twitter.com/****'
          }, {
            type: 'link',
            icon: 'DiscordIcon',
            iconColor: 'grey',
            sx: {
              textDecoration: 'none',
              mr: 2,
              verticalAlign: 'middle'
            },
            href: 'https://discord.com/****'
          }, {
            type: 'wallet',
          }]
        }
      ]
    }
  ],
};
