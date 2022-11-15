import { lazy } from 'react';
import { Route } from 'react-location';
import { ROUTES_PATH } from './constants';

const PostContent = lazy(() => import('./pages/Reservoir'));

const ROUTE_LIST: Route[] = [
    {
        element: <PostContent />,
    },
];

export const routes: Route[] = [
    ...ROUTE_LIST,
    {
        path: '/:language',
        children: ROUTE_LIST,
    },
];
