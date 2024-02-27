import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./home";
import Layout from "../components/core/Layout";
import ProductsPage from "./products";
import PageLoader from "../components/core/PageLoader";
import ProductPage from "./products/[id]";
import CategoriesPage from "./categories";
import ShopsPage from "./shops";
import ShopPage from "./shops/[id]";
import ShopProductsPage from "./shops/[id]/products";
import ShopSalesPage from "./shops/[id]/sales";

const AppRoutes = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path={CategoriesPage.path} element={<CategoriesPage.Render />} />
          <Route path={ProductPage.path()} element={<ProductPage.Render />} />
          <Route path={ProductsPage.path} element={<ProductsPage.Render />} />
          <Route path={ShopPage.path()} element={<ShopPage.Render />}>
            <Route path={ShopProductsPage.path()} element={<ShopProductsPage.Render />} />
            <Route path={ShopSalesPage.path()} element={<ShopSalesPage.Render />} />
          </Route>
          <Route path={ShopsPage.path} element={<ShopsPage.Render />} />
          <Route path={HomePage.path} element={<HomePage.Render />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
