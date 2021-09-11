
import { Utility } from "./node_modules/nidza/index";

/**
 * @description Examples loader handler
 * I use async loading script.
 */

Utility.importAsync("js/" + Utility.QueryUrl().u, () => {
  console.info('Application runned.')
});