import { Box, IconButton, Link, Menu, MenuItem, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { get, map } from 'lodash';
import { Icons } from './svgIcons';

export function TemplateItem(props: any) {
  const { items, pipe } = props;
  const { t } = pipe;
  if (!items) {
    return <></>;
  }
  return <>
    {
      map(items, item => {
        const { type, items: subItems, ...otherProps } = item;
        switch (item.type) {
          case 'container':
            return <Container {...otherProps}><TemplateItem items={subItems} pipe={pipe}></TemplateItem></Container>;
          case 'box':
            const { ...boxProps } = otherProps;
            return <Box {...boxProps}><TemplateItem items={subItems} pipe={pipe}></TemplateItem></Box>
          case 'typography':
            const { label: typoLabel, ...typoProps } = otherProps;
            return <Typography {...typoProps}>{t(typoLabel)}</Typography>;
          case 'iconButton':
            const { icon, iconColor, onClick, ...iconBtnProps } = otherProps;
            return <IconButton onClick={(event) => onClick(event, pipe)} {...iconBtnProps}><Icons icon={icon} color={iconColor}></Icons></IconButton>;
          case 'link':
            const { icon: linkIcon, iconColor: linkIconColor, linkLabel = '', ...linkProps } = otherProps;
            return <Link {...linkProps}><Icons icon={linkIcon} color={linkIconColor}></Icons> {linkLabel}</Link>
          case 'menu':
            const { onClose, ...menuProps } = otherProps;
            return <Menu anchorEl={get(pipe, 'anchorElNav')} open={Boolean(get(pipe, 'anchorElNav'))} onClose={(event) => onClose(event, pipe)} {...menuProps}>
              <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
            </Menu>
          case 'menuItem':
            const { ...menuItemProps } = otherProps;
            return <MenuItem {...menuItemProps}>
                <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
              </MenuItem>
          case 'wallet':
            return <WalletModalProvider><WalletMultiButton {...otherProps}/></WalletModalProvider>
          default:
            return <></>;
        }
      })
    }
  </>
}