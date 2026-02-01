function openStartModal() {
    openModal({
        title: '',
        message: `
            <div class="modal123">
                <h3>Bạn có phải là tân sinh viên không?</h3>
                <div class="modal-options">
                    <button>Có</button>
                    <button>Không</button>
                </div>
                <h3>Bạn có muốn được định hường ngành nghề?</h3>
                <div class="modal-options">
                    <button>Có</button>
                    <button>Không</button>
                </div>
                <h3>Bạn có muốn được giới thiệu các lĩnh vực trong ban công nghệ?</h3>
                <div class="modal-options">
                    <button>Có</button>
                    <button>Không</button>
                </div>
            </div>
            
        `,
        options: [
            { 
                type: 'hidden',
                message: '',
                callback: closeModal,
            },
            { 
                type: 'hidden',
                message: '',
                callback: closeModal,
            },
        ]
    })
}