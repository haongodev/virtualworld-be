import NextLink from 'next/link';
import { Box, Link, ListItemText } from '@mui/material';
import Iconify from '../../Iconify';
import { ListItemStyle, ListItemTextStyle, ListItemIconStyle } from './style';
import { isExternalLink } from '..';
import React from 'react';

// ----------------------------------------------------------------------

export function NavItemRoot({ item, isCollapse, open = false, active, onOpen }) {
  const { title, path, icon, info, children } = item;

  const renderContent = (
    <>
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemTextStyle disableTypography primary={title} isCollapse={isCollapse} />
      {!isCollapse && (
        <>
          {info && info}
          {children && <ArrowIcon open={open} />}
        </>
      )}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeRoot={active}>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener">
      {renderContent}
    </ListItemStyle>
  ) : (
    <Link href={path} component={NextLink} underline='none'>
      <ListItemStyle activeRoot={active}>{renderContent}</ListItemStyle>
    </Link>
  );
}

// ----------------------------------------------------------------------

export function NavItemSub({ item, open = false, active = false, onOpen }) {
  const { title, path, info, children, icon } = item;

  const renderContent = (
    <>
      <DotIcon active={active} />
      {icon && <ListItemIconStyle>{icon}</ListItemIconStyle>}
      <ListItemText disableTypography primary={title} />
      {info && info}
      {children && <ArrowIcon open={open} />}
    </>
  );

  if (children) {
    return (
      <ListItemStyle onClick={onOpen} activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    );
  }

  return isExternalLink(path) ? (
    <ListItemStyle component={Link} href={path} target="_blank" rel="noopener" subItem>
      {renderContent}
    </ListItemStyle>
  ) : (
    <Link href={path} component={NextLink} underline='none'>
      <ListItemStyle activeSub={active} subItem>
        {renderContent}
      </ListItemStyle>
    </Link>
  );
}

// ----------------------------------------------------------------------

export function DotIcon({ active }) {
  return (
    <ListItemIconStyle>
      <Box
        component="span"
        sx={{
          width: 4,
          height: 4,
          borderRadius: '50%',
          bgcolor: 'text.disabled',
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
          ...(active && {
            transform: 'scale(2)',
            bgcolor: 'primary.main',
          }),
        }}
      />
    </ListItemIconStyle>
  );
}

// ----------------------------------------------------------------------

export function ArrowIcon({ open }) {
  return (
    <Iconify
      icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      sx={{ width: 16, height: 16, ml: 1 }}
    />
  );
}
