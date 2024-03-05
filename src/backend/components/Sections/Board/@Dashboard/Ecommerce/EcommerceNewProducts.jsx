import Slider from 'react-slick';
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Button, CardContent, Typography } from '@mui/material';
import { _ecommerceNewProducts } from '@/src/backend/_mock/_ecommerce';
import React from 'react';
import CustomImage from '@/src/backend/components/Image';
import CarouselDots from '@/src/backend/components/Carousel/CarouselDots';

// ----------------------------------------------------------------------

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

export default function EcommerceNewProducts() {
  const theme = useTheme();

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({ position: 'absolute', right: 24, bottom: 24 }),
  };

  return (
    <Card sx={{height:'100%'}}>
      <Slider {...settings}>
        {_ecommerceNewProducts.map((item) => (
          <CarouselItem key={item.name} item={item} />
        ))}
      </Slider>
    </Card>
  );
}

// --------------

function CarouselItem({ item }) {
  const { image, name } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          zIndex: 9,
          maxWidth: '80%',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
          New
        </Typography>
        <Typography noWrap variant="h5" sx={{ mt: 1, mb: 3 }}>
          {name}
        </Typography>
        <Button variant="contained">Buy Now</Button>
      </CardContent>
      <OverlayStyle />
      <CustomImage alt={name} src={image} sx={{ height: { xs: 280, xl: 320 } }} ratio={undefined} />
    </Box>
  );
}
