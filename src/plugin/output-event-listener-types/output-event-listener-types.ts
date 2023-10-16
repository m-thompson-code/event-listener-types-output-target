import type { Config, OutputTargetCustom, CompilerCtx, BuildCtx } from "@stencil/core/internal";
import type { OutputTargetStrictEventListeners, NormalizedOutputTargetStrictEventListeners } from "../../types";
import { normalizeOutputTarget } from "../normalize-output-target";
import { generator } from "../generator";

export const outputEventListenerTypes = (outputTarget: OutputTargetStrictEventListeners = {}): OutputTargetCustom => {
    let validatedOutputTarget: NormalizedOutputTargetStrictEventListeners;

    return {
        type: "custom",
        name: "strict event listener types",
        validate(config: Config) {
            validatedOutputTarget = normalizeOutputTarget(config, outputTarget);
        },
        async generator(_config: Config, compilerCtx: CompilerCtx, buildCtx: BuildCtx) {
            const timespan = buildCtx.createTimeSpan(`generate strict event listener types started`, true);

            await generator(validatedOutputTarget, compilerCtx, buildCtx);

            timespan.finish(`generate strict event listener types finished`);
        },
    };
};
