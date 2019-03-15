
export default class FullscreenUtil {

    static get isActive() {
        if (document.webkitIsFullScreen || document.Fullscreen || document.mozFullScreen || document.webkitFullScreen || document.msRequestFullscreen) {
            return true;
        }
        return false;
    }

    static addEventListener(callback) {
        document.addEventListener('webkitfullscreenchange', callback);
        document.addEventListener('mozfullscreenchange', callback);
        document.addEventListener('fullscreenchange', callback);
    }

    static removeEventListener(callback) {
        document.removeEventListener('webkitfullscreenchange', callback);
        document.removeEventListener('mozfullscreenchange', callback);
        document.removeEventListener('fullscreenchange', callback);
    }

    static toggle(element = document.children[0]) {
        if (!FullscreenUtil.isActive) {
            FullscreenUtil.launchFullscreen(element);
            return;
        }
        FullscreenUtil.exitFullscreen();
    }

    static launchFullscreen(element = document.children[0]) {
        if (element.requestFullscreen) {
            element.requestFullscreen();
            return;
        }

        if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
            return;
        }

        if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
            return;
        }

        if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
            return;
        }
    }

    static exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            return;
        }

        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            return;
        }

        if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
            return;
        }
    }
}