import { useState, useTransition } from 'react';
// @mui
import { MenuItem, Stack } from '@mui/material';
import IconButtonAnimate from '../../components/animate/IconButtonAnimate';
import React from 'react';
import CustomImage from "../../components/Image";
import MenuPopover from '../../components/MenuPopover';
import { DefaultLanguage, LanguagesSupport } from '../../constant';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = Cookies.get('MANAGEMENT_LOCALE') ?? DefaultLanguage;
  
  const currentLang = LanguagesSupport.filter((item) => item.value === locale)[0];
  const [open, setOpen] = useState(null);

  const onChangeLang = (locale) => {
    Cookies.set('MANAGEMENT_LOCALE', locale);
    router.refresh();
  }
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && { bgcolor: 'action.selected' }),
        }}
      >
        <CustomImage disabledEffect src={currentLang.icon} alt={currentLang.label} ratio={undefined} sx={undefined} />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          mt: 1.5,
          ml: 0.75,
          width: 180,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }}
      >
        <Stack spacing={0.75}>
          {LanguagesSupport.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === locale}
              onClick={() => {
                onChangeLang(option.value);
                handleClose();
              }}
            >
              <CustomImage disabledEffect alt={option.label} src={option.icon} sx={{ width: 28, mr: 2 }} ratio={undefined} />

              {option.label}
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
