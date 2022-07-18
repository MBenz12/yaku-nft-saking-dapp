import { Box, Grid, IconButton, Link, Menu, MenuItem, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { get, map } from 'lodash';
import { Icons } from './svgIcons';

const getKey = (item: any, index: number) => `${get(item, 'type')}#${index}`;

export function TemplateItem(props: any) {
  const { items, pipe } = props;
  const { t } = pipe;
  if (!items) {
    return <></>;
  }
  return <>
    {
      map(items, (item: any, index: number) => {
        const { type, items: subItems, ...otherProps } = item;
        const key = getKey(item, index);
        switch (item.type) {
          case 'container':
            return <Container key={key} {...otherProps}><TemplateItem items={subItems} pipe={pipe}></TemplateItem></Container>;
          case 'grid':
            const { spacing } = otherProps;
            return <Grid container spacing={spacing} {...otherProps}>
              <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
            </Grid>
          case 'gridItem':
            const { xs } = otherProps;
            return <Grid item xs={xs} {...otherProps}><TemplateItem items={subItems} pipe={pipe}></TemplateItem></Grid>
          case 'box':
            const { ...boxProps } = otherProps;
            return <Box key={key} {...boxProps}><TemplateItem items={subItems} pipe={pipe}></TemplateItem></Box>
          case 'typography':
            const { label: typoLabel, ...typoProps } = otherProps;
            return <Typography key={key} {...typoProps}>{t(typoLabel)}</Typography>;
          case 'iconButton':
            const { icon, iconColor, onClick, ...iconBtnProps } = otherProps;
            return <IconButton key={key} onClick={(event) => onClick(event, pipe)} {...iconBtnProps}><Icons icon={icon} color={iconColor}></Icons></IconButton>;
          case 'link':
            const { icon: linkIcon, iconColor: linkIconColor, linkLabel = '', ...linkProps } = otherProps;
            return <Link key={key} {...linkProps}><Icons icon={linkIcon} color={linkIconColor}></Icons> {linkLabel}</Link>
          case 'menu':
            const { onClose, ...menuProps } = otherProps;
            return <Menu key={key} anchorEl={get(pipe, 'anchorElNav')} open={Boolean(get(pipe, 'anchorElNav'))} onClose={(event) => onClose(event, pipe)} {...menuProps}>
              <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
            </Menu>
          case 'menuItem':
            const { ...menuItemProps } = otherProps;
            return <MenuItem key={key} {...menuItemProps}>
                <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
              </MenuItem>
          case 'wallet':
            return <WalletModalProvider key={key}><WalletMultiButton {...otherProps}/></WalletModalProvider>
          default:
            return <></>;
        }
      })
    }
  </>
}