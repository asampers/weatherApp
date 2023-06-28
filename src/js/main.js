// Import our custom CSS
import "../scss/styles.scss";
import { apiCallGenerator } from "./api-call";

const results = await apiCallGenerator();

console.log(results);
