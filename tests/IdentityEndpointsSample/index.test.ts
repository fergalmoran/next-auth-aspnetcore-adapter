import {fixtures} from "../fixtures";
import {AspNetIdentityAdapter} from "../../src";
import {runBasicTests} from "../.";

runBasicTests({
    adapter: AspNetIdentityAdapter(fixtures.baseUrl),
    fixtures,
}).then(r => {
    console.log('IdentityEndpointsSample', 'Tests complete', r)
});
