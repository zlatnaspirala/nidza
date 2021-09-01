
import { Utility } from "../index";

/**
 * @description Examples loader handler
 * I use async loading script.
 */

Utility.importAsync("js/" + Utility.QueryUrl().u, () => {
  console.info('Application runned.')
});
