import React from "react";
import { PATH_DASHBOARD } from "../../routes";
import { FaCartShopping } from "react-icons/fa6";
import { RiDashboard2Fill } from "react-icons/ri";
import { MdLocalMovies } from "react-icons/md";

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'dashboard',
        path: PATH_DASHBOARD.root,
        icon: <RiDashboard2Fill/>,
      },
    ],
  },

  // MOVIE MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'Movie management',
    items: [
      {
        title: 'movie',
        path: PATH_DASHBOARD.movies,
        icon: <MdLocalMovies/>,
      },
    ],
  },
];

export default navConfig;
