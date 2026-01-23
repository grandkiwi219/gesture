import utils from "page/utils/utils";
import logger from "src/main/utils/logger";

export function executeCustomScript(data_script: string) {
    try {
        const script = document.createElement('script');
        script.textContent = 
`
(function() {

${data_script}

})(0);
`;
        const target = document.head || document.documentElement;
        target.appendChild(script);
    } catch (error) {
        utils.showAlert({ msg: '이 사이트에서 사용자 지정 스크립트를 실행할 수 없습니다.', type: 'error' });
    }
}
