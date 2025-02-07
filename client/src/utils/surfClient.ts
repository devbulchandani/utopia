import { createSurfClient } from "@thalalabs/surf";
import { aptosClient } from "../utils/aptosClient";

const surf = createSurfClient(aptosClient());

export function surfClient() {
  return surf;
}
