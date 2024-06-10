import {GLOBAL_EVENTS_HANDLER} from "@/constants/global-events";
import {GlobalEventType} from "@/enums/events/global-event-type.enum";

export class Loader {
    currentState = false
    showLoader() {
        this.currentState = true;
        this.#emitLoaderState();
    }
    hideLoader() {
        this.currentState = false;
        this.#emitLoaderState();
    }
    toggleLoader() {
        this.currentState = !this.currentState;
        this.#emitLoaderState();
    }
    #emitLoaderState() {
        GLOBAL_EVENTS_HANDLER.emit(GlobalEventType.LoaderToggle, {isLoadingState: this.currentState});
    }
}
