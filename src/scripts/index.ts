const next_page: Script = {
    key: 'next_page',
    description: '다음 페이지',
    script: function() {
        history.forward();
    }
}

const previous_page: Script = {
    key: 'previous_page',
    description: '이전 페이지',
    script: function() {
        history.back();
    }
}

const go_to_up: Script = {
    key: 'go_to_up',
    description: '맨 위로',
    script: function() {

    }
}

const go_to_down: Script = {
    key: 'go_to_down',
    description: '맨 아래로',
    script: function() {

    }
}

const close_tap: Script = {
    key: 'close_tap',
    description: '탭 닫기',
    script: function() {

    }
}

const minimize_window: Script = {
    key: 'close_tap',
    description: '창 최소화',
    script: function() {
        
    }
}

const refresh: Script = {
    key: 'refresh',
    description: '새로고침',
    script: function() {
        location.reload();
    }
}


export default {
    next_page,
    previous_page,
    go_to_up,
    go_to_down,
    close_tap,
    minimize_window,
    refresh
}