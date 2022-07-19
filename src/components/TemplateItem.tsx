import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import {
  WalletDialogProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { get, map, isFunction } from "lodash";
import { ExpandMoreIcon, Icons, SolanaIcon } from "./svgIcons";
import { Image } from "mui-image";
import { ColorButton } from "./ColorButton";
import { ExpandMore } from "./ExpandMore";

const getKey = (item: any, index: number) => `${get(item, "type")}#${index}`;
const renderComponent = ({ items, pipe }: any, { item, index }: any) => {
  const { t, theme, colorMode, dataModel, expanded, handleExpandClick, opened } = pipe;
  const isDarkMode = theme?.palette?.mode === "dark";
  const { type, items: subItems, hidden, ...otherProps } = item;
  const key = getKey(item, index);
  if (isFunction(hidden) ? !!hidden(pipe) : !!hidden) {
    return <></>
  }
  const processFunc = (value: Function | string | number, params = pipe) => isFunction(value) ? value(params) : value;
  const components: any = {
    container: () => (
      <Container key={key} {...otherProps}>
        <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
      </Container>
    ),
    paper: () => (
      <Paper key={key} {...otherProps}>
        <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
      </Paper>
    ),
    collapse: () => {
      const { ...collapseProps } = otherProps;
      return <Collapse in={expanded} {...collapseProps}>
        <CardContent>
          <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
        </CardContent>
      </Collapse>
    },
    card: () => {
      const {
        image,
        src,
        imageHeight,
        alt,
        title,
        description,
        buttons,
        showLoading,
        fit = "cover",
        canExpand,
        expandItems,
        ...cardProps
      } = otherProps;
      return (
        <Card key={key} {...cardProps}>
          {src && (
            <CardMedia>
              <Image
                height={imageHeight}
                src={src || image}
                alt={alt}
                showLoading={showLoading}
                fit={fit}
              ></Image>
            </CardMedia>
          )}
          <CardContent>
            {title && (
              <TemplateItem
                items={[
                  {
                    type: "typography",
                    label: processFunc(title),
                    variant: "h6",
                  },
                ]}
                pipe={pipe}
              ></TemplateItem>
            )}
            {description && (
              <TemplateItem items={description} pipe={pipe}></TemplateItem>
            )}
          </CardContent>
          <CardActions>
            <TemplateItem items={buttons} pipe={pipe}></TemplateItem>
            { canExpand && <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}>
                <ExpandMoreIcon />
              </ExpandMore>
            }
          </CardActions>
          { canExpand && <TemplateItem items={expandItems} pipe={pipe}></TemplateItem>}
        </Card>
      );
    },
    dialog: () => {
      const { buttons, onClick, ...dialogProps } = otherProps;
      return <Dialog open={opened} onClick={(event) => onClick && onClick(event, pipe)} {...dialogProps}>
        {
          map(subItems, ({ items: contentItems, ...contentProps }, idx) => 
          <DialogContent key={`${key}#${idx}`} {...contentProps}>
            <TemplateItem items={contentItems} pipe={pipe}></TemplateItem>
          </DialogContent>
        )}
        { buttons && <DialogActions>
          <TemplateItem items={buttons} pipe={pipe}></TemplateItem>
        </DialogActions>}
      </Dialog>
    },
    form: () => {
      const { ...formProps } = otherProps;
      return <FormControl {...formProps}>
        <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
      </FormControl>
    },
    radioGroup: () => {
      const { value, onChange, options, radio, ...radioGrpProps } = otherProps;
      return <RadioGroup value={processFunc(value)} onChange={(event: any) => onChange && onChange(event, pipe)} {...radioGrpProps}>
        {
          map(options, ({ value, label, description }) => <>
            <FormControlLabel value={value} control={<Radio {...radio}/>} label={t(processFunc(label))} />
            { description && <Typography component='p' sx={{ marginLeft: 4 }}> {t(processFunc(description))} </Typography> }
            </>)
        }
      </RadioGroup>
    },
    grid: () => {
      const { spacing } = otherProps;
      return (
        <Grid key={key} container spacing={spacing} {...otherProps}>
          <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
        </Grid>
      );
    },
    gridList: () => {
      const {
        spacing: gridListSpacing,
        breakpoints = { xs: 3 },
        elevation = 1,
        sx = {
          p: 2,
          display: "flex",
          justifyContent: "space-between",
        },
        extraItems,
        ...gridListProps
      } = otherProps;
      return (
        <Grid key={key} container spacing={gridListSpacing} {...gridListProps}>
          {subItems &&
            map(subItems, ({ label, key }) => (
              <Grid key={key} item {...breakpoints}>
                <Paper key={key} elevation={elevation} sx={sx}>
                  <Typography component="h6">{t(processFunc(label))}</Typography>
                  <Typography component="p">
                    {get(dataModel, key, 0)}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          <TemplateItem items={extraItems} pipe={pipe}></TemplateItem>
        </Grid>
      );
    },
    gridItem: () => {
      const { xs } = otherProps;
      return (
        <Grid key={key} item xs={xs} {...otherProps}>
          <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
        </Grid>
      );
    },
    box: () => {
      const { ...boxProps } = otherProps;
      return (
        <Box key={key} {...boxProps}>
          <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
        </Box>
      );
    },
    typography: () => {
      const { label: typoLabel, ...typoProps } = otherProps;
      return (
        <Typography key={key} {...typoProps}>
          {t(processFunc(typoLabel))}
        </Typography>
      );
    },
    chip: () => {
      const { label: chipLabel, ...chipProps } = otherProps;
      return (
        <Chip
          key={key}
          label={t(processFunc(chipLabel))}
          {...chipProps}
        ></Chip>
      );
    },
    chipList: () => {
      const { label: chipListLabel, data, ...chipListProps } = otherProps;
      return (
        <>{
          map(data, (dataItem: any, idx: number) => <Chip
            key={`${key}#${idx}`}
            label={t(processFunc(chipListLabel, { ...pipe, data: dataItem }))}
            {...chipListProps}
          ></Chip>)
        }</>
      );
    },
    button: () => {
      const {
        label: buttonLabel,
        onClick: onButtonClick,
        ...buttonProps
      } = otherProps;
      return (
        <Button
          key={key}
          onClick={(event) => onButtonClick && onButtonClick(event, pipe)}
          {...buttonProps}
        >
          {t(processFunc(buttonLabel))}
        </Button>
      );
    },
    colorButton: () => {
      const {
        label: colorBtnLabel,
        onClick: onColorBtnClick,
        ...colorBtnProps
      } = otherProps;
      return (
        <ColorButton
          key={key}
          onClick={(event: any) => onColorBtnClick && onColorBtnClick(event, pipe)}
          {...colorBtnProps}
        >
          {t(processFunc(colorBtnLabel))}
        </ColorButton>
      );
    },
    iconButton: () => {
      const {
        icon,
        iconColor,
        onClick: onIconButtonClick,
        ...iconBtnProps
      } = otherProps;
      const finalIconColor = isDarkMode
        ? theme.palette.getContrastText(iconColor)
        : iconColor;
      return (
        <IconButton
          key={key}
          onClick={(event) => onIconButtonClick && onIconButtonClick(event, pipe)}
          {...iconBtnProps}
        >
          <Icons icon={icon} color={finalIconColor}></Icons>
        </IconButton>
      );
    },
    toggleColorButton: () => {
      const { iconColor: toggleIconColor, ...toggleIconProps } = otherProps;
      const finalColor = isDarkMode
        ? theme.palette.getContrastText(toggleIconColor)
        : toggleIconColor;
      return (
        <IconButton
          key={key}
          onClick={colorMode.toggleColorMode}
          color="inherit"
          {...toggleIconProps}
        >
          {isDarkMode ? (
            <Icons icon="Brightness7Icon" color={finalColor} />
          ) : (
            <Icons icon="Brightness4Icon" color={finalColor} />
          )}
        </IconButton>
      );
    },
    link: () => {
      const {
        icon: linkIcon,
        iconColor: linkIconColor,
        linkLabel = "",
        ...linkProps
      } = otherProps;
      return (
        <Link key={key} {...linkProps}>
          <Icons icon={linkIcon} color={linkIconColor}></Icons> {processFunc(linkLabel)}
        </Link>
      );
    },
    menu: () => {
      const { onClose, ...menuProps } = otherProps;
      return (
        <Menu
          key={key}
          anchorEl={get(pipe, "anchorElNav")}
          open={Boolean(get(pipe, "anchorElNav"))}
          onClose={(event) => onClose && onClose(event, pipe)}
          {...menuProps}
        >
          <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
        </Menu>
      );
    },
    menuItem: () => {
      const { ...menuItemProps } = otherProps;
      return (
        <MenuItem key={key} {...menuItemProps}>
          <TemplateItem items={subItems} pipe={pipe}></TemplateItem>
        </MenuItem>
      );
    },
    image: () => {
      const { src, image, alt = '', ...imageProps } = otherProps;
      return <Image src={src || (isFunction(image) ? image(pipe) : image)} alt={alt} {...imageProps} />
    },
    wallet: () => (
      <WalletDialogProvider key={key}>
        <WalletMultiButton {...otherProps}>
          <SolanaIcon></SolanaIcon>
        </WalletMultiButton>
      </WalletDialogProvider>
    ),
  };
  return isFunction(components[item?.type]) ? components[item?.type]() : <></>;
};
export function TemplateItem(props: any) {
  const { items, pipe } = props;
  if (!items) {
    return <></>;
  }
  return (
    <>
      {map(items, (item: any, index: number) =>
        renderComponent({ items, pipe }, { item, index })
      )}
    </>
  );
}
