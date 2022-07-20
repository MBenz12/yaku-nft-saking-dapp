## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```
## Install


```bash
npm install
# or
yarn install
```

## Configurable items

There are serveral configurable items in this project and those configs are located at `config.tsx` and inside `src/configs` folder.

### `config.tsx`

#### config the mainnet and fellows contract information.

```ts
export const NETWORK = "mainnet-beta";
export const USER_POOL_SIZE = 3664;
export const GLOBAL_AUTHORITY_SEED = "global-authority";
export const EPOCH = 7200;
export const REWARD_TOKEN_DECIMAL = 1000000000;

export const ADMIN_PUBKEY = new PublicKey( __ADMIN_PUBLIC_KEY__ );
export const REWARD_TOKEN_MINT = new PublicKey( __REWARD_TOKEN_MINT_KEY __);
export const PROGRAM_ID = __PROGRAM_ID__;

export const NFT_CREATOR = __CREATOR_ADDRESS__;
export const METAPLEX = new web3.PublicKey( __METAPLEX_ADDRESS__ );
```

#### Config project specific information for UI

Twitter and Discord link

```ts
export const TWITTER = "https://twitter.com/****";
export const DISCORD = "https://discord.com/****";
```

Allow Staking Models in UI, if only 1 model allowed, the NFT Stake will not show the stake dialog.

```ts
// 3 Models support
export const ALLOWED_MODELS: Array<any> = [{
  value: '1',
  label: 'MODELS.1.LABEL',
  description: 'MODELS.1.DESC'
}, {
  value: '2',
  label: 'MODELS.2.LABEL',
  description: 'MODELS.2.DESC'
}, {
  value: '3',
  label: 'MODELS.3.LABEL',
  description: 'MODELS.3.DESC',
}];
```

```ts
// 1 Model support
export const ALLOWED_MODELS: Array<any> = [{
  value: '1',
  label: 'MODELS.1.LABEL',
  description: 'MODELS.1.DESC'
}];
```

Specific which model to enable lockdays options in UI, `MODEL_CAN_SELECT_LOCKDAYS` should be equal to one of the `value` in `ALLOWED_MODELS`

```ts
export const MODEL_CAN_SELECT_LOCKDAYS = '3';
```

Allow options for lockdays

```ts
export const ALLOWED_LOCKDAYS: Array<any> = [{
  value: '7',
  label: 'LOCKDAYS.7DAYS'
}, {
  value: '14',
  label: 'LOCKDAYS.14DAYS'
}, {
  value: '30',
  label: 'LOCKDAYS.30DAYS'
}]
```

Default value

```ts
export const DEFAULT_MODEL = '1';
export const DEFAULT_LOCKDAY = '7';
export const DEFAULT_PERIOD = 1;
```

Model value to period

```ts
export const MODEL_PERIOD_MAPPING: any = {
  '1': 15,
  '2': 0,
}
```

### `src/configs`

To config the UI layout, we can customize the header, the dashboard, the NFT card, and the Staking Dialog as well as the `i18n` text used in the pages.

#### `./header.ts`

For the header layout customization, we can use a template format to define the content inside the `AppBar` (component in MUI). Please view the `TemplateItem` section for details.

Example:

```ts
export const header = {
  position: "static",
  maxWidth: "xl",
  disableGutters: true,
  color: "transparent",
  items: [
    {
      type: "box",
      sx: {
        flexGrow: 1,
        display: {
          xs: "flex",
          md: "none",
        },
      },
      items: [
        {
          type: "iconButton",
          size: "large",
          color: "inherit",
          iconColor: "#808080",
          icon: "MenuIcon",
          onClick: handleOpenNavMenu,
        },
        {
          type: "menu",
          id: "menu-appbar",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          keepMounted: true,
          transformOrigin: {
            vertical: "top",
            horizontal: "left",
          },
          onClose: handleCloseNavMenu,
          sx: {
            display: { xs: "block", md: "none" },
          },
          items: [
            {
              type: "typography",
              label: "STAKING.TITLE",
              textAlign: "center",
              sx: {
                px: 2,
              },
            },
          ],
        },
      ],
    },
    {
      type: "grid",
      spacing: 2,
      sx: {
        justifyContent: "flex-end",
      },
      items: [
        {
          type: "gridItem",
          xs: 6,
          sx: {
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          },
          items: [
            {
              type: "typography",
              variant: "h6",
              noWrap: true,
              component: "a",
              href: "/",
              sx: {
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "text.primary",
                textDecoration: "none",
              },
              label: "TITLE",
            },
          ],
        },
        {
          type: "gridItem",
          xs: 6,
          sx: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          },
          items: [
            {
              type: "toggleColorButton",
              iconColor: "#808080",
              sx: {
                mr: 2,
              },
            },
            {
              type: "iconButton",
              icon: "TwitterIcon",
              iconColor: "#808080",
              sx: {
                mr: 2,
              },
              onClick: handleTwitterClick,
            },
            {
              type: "iconButton",
              icon: "DiscordIcon",
              iconColor: "#808080",
              sx: {
                mr: 2,
              },
              onClick: handleDiscordClick,
            },
            {
              type: "wallet",
              variant: "outlined",
              sx: {
                borderRadius: 5000,
              },
            },
          ],
        },
      ],
    },
  ],
};
```

#### `./dashboard.ts`

For the upper part of the layout in the body, we can use a template format to define the content inside the `Container`. Please view the `TemplateItem` section for details.

Inside the file, we will have `fields` and `dashboard`. `fields` are the items that will / can be get in the `GlobalPool`. This array of object will also be used to transform the view model for the UI.

`fields` Example:

```ts
export const fields = [
  {
    label: "RATES.ADVENTURE",
    key: "adventureRate",
  },
  {
    label: "RATES.COMMANDER",
    key: "commanderRate",
  },
  {
    label: "RATES.DOCTOR",
    key: "doctorRate",
  },
  {
    label: "RATES.NORMAL",
    key: "normalRate",
  },
  {
    label: "RATES.SCIENTIST",
    key: "scientistRate",
  },
  {
    label: "RATES.SPECIALIST",
    key: "specialistRate",
  },
  {
    label: "RATES.TOTAL_AMOUNT",
    key: "totalAmount",
    base: 1,
  },
];
```

`key` is the value key from the `GlobalPool`,
`base` is for calculation. Default calculate the value from `GlobalPool` divided by `LAMPORTS_PER_SOL`. The formula is `globalPool[key] / base`

`dashboard` Example:

```ts
export const dashboard = {
  maxWidth: "xl",
  className: "dashboard-container",
  sx: {
    p: 4,
    backgroundColor: "background.default",
    color: "text.primary",
  },
  items: [
    {
      type: "paper",
      elevation: 0,
      items: [
        {
          type: "gridList",
          spacing: 2,
          breakpoints: {
            xs: 6,
            md: 3,
          },
          elevation: 1,
          items: fields,
          sx: {
            p: 2,
            display: { xs: "block", md: "flex" },
            justifyContent: "space-between",
          },
          extraItems: [
            {
              type: "gridItem",
              xs: 6,
              md: 3,
              items: [
                {
                  type: "paper",
                  elevation: 1,
                  sx: {
                    p: 2,
                    display: { xs: "block", md: "flex" },
                    justifyContent: "space-between",
                  },
                  items: [
                    {
                      type: "typography",
                      component: "h6",
                      label: "DASHBOARD.STAKED_NFT_COUNT",
                      noWrap: true,
                    },
                    {
                      type: "typography",
                      component: "p",
                      label: ({ userStakedCount }: any) => userStakedCount,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paper",
      elevation: 0,
      items: [{
        type: 'grid',
        sx: { justifyContent: "flex-end", py: 2 },
        items: [{
          type: 'colorButton',
          colorname:"yellow",
          variant:"contained",
          onClick: (event: any, { handleClaimAll }: any) => handleClaimAll(),
          sx: {
            borderRadius: 5000,
            textTransform: "none",
          },
          label: ({ t, rewardAmount}: any) => `${t("ACTIONS.CLAIM_ALL")} (${rewardAmount.toLocaleString()} ${t("TOKEN.NAME")})`
        }]
      }]
    }
  ],
};
```

#### `./nftCard.ts`

To config the layout for NFT card and Staked NFT card, we can use a template format to define the content. Please view the `TemplateItem` section for details.

Nft Card:

```ts
export const nftCard = ({ image, name, attributes }: any, { handleStake }: any) => ({
  type: "card",
  alt: "",
  showLoading: true,
  image: image,
  src: image,
  title: name,
  sx: {
    borderRadius: 4,
  },
  canExpand: true,
  buttons: [
    {
      type: "button",
      label: "ACTIONS.STAKE",
      color: "success",
      variant: "outlined",
      sx: {
        marginLeft: "auto",
        borderRadius: 5000,
        fontWeight: 700,
        textTransform: "none",
      },
      onClick: () => handleStake(true),
    },
  ],
  expandItems: [{
    type: 'collapse',
    items: [{
      type: "chipList",
      color: "default",
      variant: "outlined",
      sx: {
        mr: 1,
        my: 1,
      },
      data: attributes,
      label: ({ data }: any) => `${data.trait_type}: ${data.value}`,
    }]
  }]
});
```

Staked Nft Card:

```ts
export const stakedNftCard = (
  { name, image, model, rate, lockTime, stakedTime, attributes }: any,
  { handleUnstake, handleClaim }: any
) => ({
  type: "card",
  alt: "",
  showLoading: true,
  image: image,
  src: image,
  title: name,
  canExpand: true,
  description: [
    {
      type: "chip",
      color: "primary",
      sx: {
        mr: 1,
        my: 1,
      },
      label: ({ t }: any) => `${t(find(ALLOWED_MODELS, ({ value }) => +value === model)?.label)}`,
    },
    {
      type: "chip",
      color: "secondary",
      sx: {
        mr: 1,
        my: 1,
      },
      label: ({ t }: any) =>
        `$${t('TOKEN.NAME')} ${rate / LAMPORTS_PER_SOL}/${t("RATES.PER_DAY")}`,
    },
    {
      type: "chip",
      color: "info",
      sx: {
        mr: 1,
        my: 1,
      },
      label: ({ t }: any) => `${moment(lockTime * 1000).fromNow(true)}`,
    },
    {
      type: "typography",
      sx: {
        mr: 1,
        my: 1,
      },
      label: ({ t }: any) =>
        `${t("DESCRIPTION.STAKED_DURATION")}: ${moment(stakedTime * 1000).fromNow(true)}`,
    },
  ],
  sx: {
    borderRadius: 4,
  },
  buttons: [
    {
      type: "button",
      label: "ACTIONS.UNSTAKE",
      color: "error",
      variant: "outlined",
      sx: {
        marginLeft: "auto",
        borderRadius: 5000,
        fontWeight: 700,
        textTransform: "none",
      },
      onClick: () => handleUnstake(),
    },
    {
      type: "button",
      label: "ACTIONS.CLAIM",
      color: "warning",
      variant: "outlined",
      sx: {
        borderRadius: 5000,
        fontWeight: 700,
        textTransform: "none",
      },
      onClick: () => handleClaim(),
    },
  ],
  expandItems: [{
    type: 'collapse',
    items: [{
      type: "chipList",
      color: "default",
      variant: "outlined",
      sx: {
        mr: 1,
        my: 1,
      },
      data: attributes,
      label: ({ data }: any) => `${data.trait_type}: ${data.value}`,
    }]
  }]
});
```

#### `./stakeDialog.ts`
