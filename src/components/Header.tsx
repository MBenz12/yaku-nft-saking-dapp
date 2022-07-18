import { AppBar, Breakpoint, Container, Toolbar } from '@mui/material';
import {
  WalletModalProvider,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import Link from 'next/link';
import { useState } from 'react';
import { TFunction } from 'react-i18next';
import { DiscordIcon, TwitterIcon } from './svgIcons';
import { TemplateItem } from './TemplateItem';

export default function Header(props: {
  position?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative',
  color?: 'inherit' | 'primary' | 'secondary' | 'default' | 'transparent',
  maxWidth?: Breakpoint,
  disableGutters?: boolean,
  items: any,
  t: TFunction
}) {
  const { position, color, maxWidth, disableGutters, items, t } = props;
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  return (
    <AppBar position={position} color={color}>
      <Container maxWidth={maxWidth}>
        <Toolbar disableGutters={disableGutters}>
          <TemplateItem items={items} pipe={{ anchorElNav, setAnchorElNav, t }}></TemplateItem>
        </Toolbar>
      </Container>
    </AppBar>
    // <header className='header'>
    //     <div className='header-content'>
    //     <div className='header-left'></div>
    //     <div className='header-center'></div>
    //     <div className='header-right'>
    //         <Link href='https://twitter.com/****'>
    //         <a className='social-link'>
    //             <TwitterIcon />
    //         </a>
    //         </Link>
    //         <Link href='https://discord.com/****'>
    //         <a className='social-link' style={{ marginRight: 20 }}>
    //             <DiscordIcon />
    //         </a>
    //         </Link>
    //         <WalletModalProvider>
    //         <WalletMultiButton />
    //         </WalletModalProvider>
    //     </div>
    //     </div>
    //     <div className='header-wallet'></div>
    // </header>
  );
}
