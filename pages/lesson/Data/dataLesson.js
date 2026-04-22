const boxDetailLesson = document.querySelector(".boxDetailLesson");
export const dataLesson = {
    Tìm_hiểu_Git_Github_và_Vercel: () => {
        boxDetailLesson.innerHTML = `
                <div class="titleLesson">Git, Github và Vercel là gì?</div>
                <div class="wrapLessonContent">
                    <div class="blockTarget">
                        <div class="titleTarget">Mục tiêu bài học</div>
                        <div class="contentTarget">Hiểu Git, GitHub và Vercel là gì — biết cách cài đặt git. Kết thúc bài, bạn có Git chạy được trên máy và hiểu rõ mình vừa cài gì.</div>
                    </div>
                    <div class="blockWhy">
                        <div class="title">Tại sao cần quản lý code?</div>
                        <div class="content">
                            Hãy tưởng tượng bạn sửa một tính năng, vô tình nó làm hỏng tính năng khác và bạn không có cách quay lại. Hoặc làm việc nhóm, mọi người cùng sửa một file cùng lúc. Đây là một trong những vấn đề gây khó khăn cho người code. Vì vậy Git được sinh ra để giải quyết chúng.
                        </div>
                    </div>
                    <div class="blockTool">
                        <div class="title">Chức năng của từng công cụ</div>
                        <div class="blockCard">
                            <div class="card">
                                <div class="cardIcon"><i class="fa-solid fa-folder-open"></i></div>
                                <div class="cardTitle">Git</div>
                                <div class="cardContent">Theo dõi lịch sử thay đổi code. Chạy hoàn toàn trên máy bạn, không cần internet.</div>
                                <div class="cardTool">Local</div>
                            </div>
                            <div class="card">
                                <div class="cardIcon"><i class="fa-solid fa-cloud-arrow-up"></i></div>
                                <div class="cardTitle">Github</div>
                                <div class="cardContent">Lưu repo(<span>Repository</span>) lên cloud, làm việc nhóm, review code và quản lý dự án.</div>
                                <div class="cardTool">Cloud</div>
                            </div>
                            <div class="card">
                                <div class="cardIcon"><i class="fa-solid fa-rocket"></i></div>
                                <div class="cardTitle">Vercel</div>
                                <div class="cardContent">Tự động deploy code từ GitHub lên internet mỗi khi bạn push.</div>
                                <div class="cardTool">Deploy</div>
                            </div>
                        </div>
                    </div>
                    <div class="blockWorkflow">
                        <div class="title">Luồng làm việc thực tế</div>
                        <div class="blockFlow">
                            <div class="flow">
                                <div class="flowNumber">
                                    <div class="number">1</div>
                                    <div class="line"></div>
                                </div>
                                <div class="flowContent">
                                    <div class="contentTarget">Viết code</div>
                                    <div class="contentNote">Máy local</div>
                                </div>
                            </div>
                            <div class="flow">
                                <div class="flowNumber">
                                    <div class="number">2</div>
                                    <div class="line"></div>
                                </div>
                                <div class="flowContent">
                                    <div class="contentTarget">git commit</div>
                                    <div class="contentNote">Lưu lịch sử</div>
                                </div>
                            </div>
                            <div class="flow">
                                <div class="flowNumber">
                                    <div class="number">3</div>
                                    <div class="line"></div>
                                </div>
                                <div class="flowContent">
                                    <div class="contentTarget">
                                        git push <span><i class="fa-solid fa-arrow-right icon"></i></span> GitHub
                                    </div>
                                    <div class="contentNote">Lên cloud</div>
                                </div>
                            </div>
                            <div class="flow flowChange">
                                <div class="flowNumber">
                                    <div class="number">4</div>
                                </div>
                                <div class="flowContent">
                                    <div class="contentTarget">Vercel deploy</div>
                                    <div class="contentNote">Tự động online</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="blockForget">
                        <div class="title">Những điều bạn cần nhớ</div>
                        <ul class="listForget">
                            <li>Git và Github là hai công cụ hoàn toàn khác nhau. Git là công cụ dùng để quản lý code trên máy tính. Github là nơi quản lý code trên mạng</li>
                            <li>Git chạy offline hoàn toàn, GitHub mới cần internet.</li>
                            <li>Vercel chỉ là một platform deploy. Ngoài Vercel còn có Netlify, Railway, Render...</li>
                        </ul>
                    </div>
                    <div class="blockDownload"></div>
                </div>
        `;
    },
    Sử_dụng_Git_Github_và_vercel: () => {
        boxDetailLesson.innerHTML = ``;
    },
};
