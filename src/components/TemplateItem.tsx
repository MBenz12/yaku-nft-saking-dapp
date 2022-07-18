import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Link, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { get, map, capitalize } from 'lodash';
import { Icons } from './svgIcons';
import { Image } from 'mui-image'
import { ColorButton } from './ColorButton';

const getKey = (item: any, index: number) => `${get(item, 'type')}#${index}`;

export function TemplateItem(props: any) {
  const { items, pipe } = props;
  const { t, theme, colorMode } = pipe;
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
          case 'paper':
            return <Paper {...otherProps}><TemplateItem items={subItems} pipe={pipe}></TemplateItem></Paper>;
          case 'card':
            const { image, src, imageHeight, alt, title, description, buttons, showLoading, ...cardProps } = otherProps;
            return <Card key={key} {...cardProps}>
              {src && <CardMedia><Image height={imageHeight} src={src || image} alt={alt} showLoading={showLoading}></Image></CardMedia>}
              <CardContent>
                {title && <TemplateItem items={[{
                  type: 'typography',
                  label: title,
                  gutterBottom: true,
                  component: 'div',
                  variant: 'h5'
                }]} pipe={pipe}></TemplateItem>}
                {description && <TemplateItem items={[{
                  type: 'typography',
                  label: description
                }]} pipe={pipe}></TemplateItem>}
              </CardContent>
              <CardActions>
                <TemplateItem items={buttons} pipe={pipe}></TemplateItem>
              </CardActions>
            </Card>
          case 'grid':
            const { spacing } = otherProps;
            return <Grid key={key} container spacing={spacing} {...otherProps}>
              <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
            </Grid>
          case 'gridItem':
            const { xs } = otherProps;
            return <Grid key={key} item xs={xs} {...otherProps}><TemplateItem items={subItems} pipe={pipe}></TemplateItem></Grid>
          case 'box':
            const { ...boxProps } = otherProps;
            return <Box key={key} {...boxProps}><TemplateItem items={subItems} pipe={pipe}></TemplateItem></Box>
          case 'typography':
            const { label: typoLabel, ...typoProps } = otherProps;
            return <Typography key={key} {...typoProps}>{t(typoLabel)}</Typography>;
          case 'button':
            const { label: buttonLabel, onClick: onButtonClick, ...buttonProps } = otherProps;
            return <Button key={key} onClick={(event) => onButtonClick(event, pipe)} {...buttonProps}>{t(buttonLabel)}</Button>
          case 'colorButton':
            const { label: colorBtnLabel, onClick: onColorBtnClick, ...colorBtnProps } = otherProps;
            return <ColorButton key={key} onClick={(event: any) => onColorBtnClick(event, pipe)} {...colorBtnProps}>{t(buttonLabel)}</ColorButton>
          case 'iconButton':
            const { icon, iconColor, onClick: onIconButtonClick, ...iconBtnProps } = otherProps;
            return <IconButton key={key} onClick={(event) => onIconButtonClick(event, pipe)} {...iconBtnProps}><Icons icon={icon} color={iconColor}></Icons></IconButton>;
          case 'toggleColorButton':
            return <Box key={key}
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                color: 'text.primary',
                borderRadius: 1,
                p: 3,
              }}
            >
              {capitalize(theme.palette.mode)} mode
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Icons icon="Brightness7Icon" /> : <Icons icon="Brightness4Icon" />}
              </IconButton>
            </Box>
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