import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import GlobalPopupContainer from "../hooks/useGlobalPopup/components/GlobalPopupContainer.vue";
import RiskRelation from "../views/risk-relation/RiskRelation.vue";
import Popup from "@/views/Popup.vue";
import PlayGround from "@/views/PlayGround.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/riskRelation", component: RiskRelation },
  { path: "/business-popups", component: Popup },
  { path: "/", component: PlayGround },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
