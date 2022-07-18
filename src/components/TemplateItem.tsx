import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Grid, IconButton, Link, Menu, MenuItem, Paper, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { WalletDialogProvider, WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import { get, map, isFunction } from 'lodash';
import { Icons, SolanaIcon } from './svgIcons';
import { Image } from 'mui-image'
import { ColorButton } from './ColorButton';

const getKey = (item: any, index: number) => `${get(item, 'type')}#${index}`;
const renderComponent = ({ items, pipe }: any, { item, index }: any) => {
  const { t, theme, colorMode, dataModel } = pipe;
  const isDarkMode = theme?.palette?.mode === 'dark';
  const { type, items: subItems, ...otherProps } = item;
  const key = getKey(item, index);
  const components = {
    container: () => <Container key={key} {...otherProps}><TemplateItem items={subItems} pipe={pipe}></TemplateItem></Container>,
    paper: () => <Paper key={key} {...otherProps}><TemplateItem items={subItems} pipe={pipe}></TemplateItem></Paper>,
    card: () => {
      const { image, src, imageHeight, alt, title, description, buttons, showLoading, fit = 'cover', ...cardProps } = otherProps;
      return <Card key={key} {...cardProps}>
        {src && <CardMedia><Image height={imageHeight} src={src || image} alt={alt} showLoading={showLoading} fit={fit}></Image></CardMedia>}
        <CardContent>
          {title && <TemplateItem items={[{
            type: 'typography',
            label: title,
            variant: 'h6'
          }]} pipe={pipe}></TemplateItem>}
          {description && <TemplateItem items={description} pipe={pipe}></TemplateItem>}
        </CardContent>
        <CardActions>
          <TemplateItem items={buttons} pipe={pipe}></TemplateItem>
        </CardActions>
      </Card>
    },
    grid: () => {
      const { spacing } = otherProps;
      return <Grid key={key} container spacing={spacing} {...otherProps}>
        <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
      </Grid>
    },
    gridList: () => {
      const {
        spacing: gridListSpacing,
        breakpoints = { xs: 3 },
        elevation = 1,
        sx = {
          p:2,
          display: 'flex',
          justifyContent: 'space-between'
        },
        extraItems,
        ...gridListProps
      } = otherProps;
      return <Grid key={key} container spacing={gridListSpacing} {...gridListProps}>
        {subItems && map(subItems, ({ label, key }) => <Grid key={key} item {...breakpoints}>
          <Paper key={key} elevation={elevation} sx={sx}>
            <Typography component='h6'>{t(label)}</Typography>
            <Typography component='p'>{get(dataModel, key, 0)}</Typography>
          </Paper>
        </Grid>)}
        <TemplateItem items={extraItems} pipe={pipe}></TemplateItem>
      </Grid>
    },
    gridItem: () => {
      const { xs } = otherProps;
      return <Grid key={key} item xs={xs} {...otherProps}><TemplateItem items={subItems} pipe={pipe}></TemplateItem></Grid>
    },
    box: () => {
      const { ...boxProps } = otherProps;
      return <Box key={key} {...boxProps}><TemplateItem items={subItems} pipe={pipe}></TemplateItem></Box>
    },
    typography: () => {
      const { label: typoLabel, ...typoProps } = otherProps;
      return <Typography key={key} {...typoProps}>{t(isFunction(typoLabel) ? typoLabel(pipe) : typoLabel)}</Typography>;
    },
    chip: () => {
      const { label: chipLabel, ...chipProps } = otherProps;
      return <Chip key={key} label={t(isFunction(chipLabel) ? chipLabel(pipe) : chipLabel)} {...chipProps}></Chip>
    },
    button: () => {
      const { label: buttonLabel, onClick: onButtonClick, ...buttonProps } = otherProps;
      return <Button key={key} onClick={(event) => onButtonClick(event, pipe)} {...buttonProps}>{t(buttonLabel)}</Button>
    },
    colorButton: () => {
      const { label: colorBtnLabel, onClick: onColorBtnClick, ...colorBtnProps } = otherProps;
      return <ColorButton key={key} onClick={(event: any) => onColorBtnClick(event, pipe)} {...colorBtnProps}>{t(colorBtnLabel)}</ColorButton>
    },
    iconButton: () => {
      const { icon, iconColor, onClick: onIconButtonClick, ...iconBtnProps } = otherProps;
      const finalIconColor = isDarkMode ? theme.palette.getContrastText(iconColor) : iconColor;
      return <IconButton key={key} onClick={(event) => onIconButtonClick(event, pipe)} {...iconBtnProps}><Icons icon={icon} color={finalIconColor}></Icons></IconButton>;
    },
    toggleColorButton: () => {
      const { iconColor: toggleIconColor, ...toggleIconProps } = otherProps;
      const finalColor = isDarkMode ? theme.palette.getContrastText(toggleIconColor) : toggleIconColor;
      return <IconButton key={key} onClick={colorMode.toggleColorMode} color='inherit' {...toggleIconProps}>
        {isDarkMode ? <Icons icon='Brightness7Icon' color={finalColor}/> : <Icons icon='Brightness4Icon' color={finalColor}/>}
      </IconButton>
    },
    link: () => {
      const { icon: linkIcon, iconColor: linkIconColor, linkLabel = '', ...linkProps } = otherProps;
      return <Link key={key} {...linkProps}><Icons icon={linkIcon} color={linkIconColor}></Icons> {linkLabel}</Link>
    },
    menu: () => {
      const { onClose, ...menuProps } = otherProps;
      return <Menu key={key} anchorEl={get(pipe, 'anchorElNav')} open={Boolean(get(pipe, 'anchorElNav'))} onClose={(event) => onClose(event, pipe)} {...menuProps}>
        <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
      </Menu>
    },
    menuItem: () => {
      const { ...menuItemProps } = otherProps;
      return <MenuItem key={key} {...menuItemProps}>
          <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
        </MenuItem>
    },
    wallet: () => <WalletDialogProvider key={key}>
      <WalletMultiButton {...otherProps}>
        <SolanaIcon></SolanaIcon>
      </WalletMultiButton>
    </WalletDialogProvider>
  }
  return isFunction(components[item?.type]) ? components[item?.type]() : <></>;
}
export function TemplateItem(props: any) {
  const { items, pipe } = props;
  if (!items) {
    return <></>;
  }
  return <>
    { map(items, (item: any, index: number) => renderComponent({ items, pipe }, { item, index })) }
  </>
}