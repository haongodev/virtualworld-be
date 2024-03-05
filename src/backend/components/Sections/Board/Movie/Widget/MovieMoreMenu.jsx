import { useState } from 'react';
import NextLink from 'next/link';
import { MenuItem, IconButton } from '@mui/material';
import React from 'react';
import Iconify from '@/src/backend/components/Iconify';
import MenuPopover from '@/src/backend/components/MenuPopover';
import { PATH_DASHBOARD } from '@/src/backend/routes';
import { useRouter } from 'next/navigation';

// ----------------------------------------------------------------------


export default function MovieMoreMenu({ slug,onDelete }) {
  const [open, setOpen] = useState(null);
  const router = useRouter();
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const ICON = {
    mr: 2,
    width: 20,
    height: 20,
  };

  const onEdit = () => {
    router.push(PATH_DASHBOARD.movies+'/edit/'+slug)
  }
  
  return (
    <>
      <IconButton onClick={handleOpen}>
        <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} sx={undefined} />
      </IconButton>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        arrow="right-top"
        sx={{
          mt: -1,
          width: 160,
          '& .MuiMenuItem-root': { px: 1, typography: 'body2', borderRadius: 0.75 },
        }} disabledArrow={undefined}>
        <MenuItem onClick={onDelete} sx={{ color: 'error.main' }}>
          <Iconify icon={'eva:trash-2-outline'} sx={{ ...ICON }} />
          Delete
        </MenuItem>

        <MenuItem onClick={onEdit} sx={{ borderRadius: 1, typography: 'body2' }}>
          <Iconify icon={'eva:edit-fill'} sx={{ mr: 2, width: 24, height: 24 }} />
          Edit
        </MenuItem>
      </MenuPopover>
    </>
  );
}
