const courseData = {
    web: `
        <div class = "wrapInformation">
            <div class = "titleInformation">Ngành lập trình Website là gì?</div>
            <div class = "contentInformation"> Ngành lập trình Website là lĩnh vực chuyên xây dựng và phát triển các Website, Web app và hệ thống chạy trên trình duyệt Internet.</div>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Ngành lập trình Web chia làm ba hướng chính:</div>
            <ul class = "listInformation">
                <li>Front-end Developer (Xây dựng giao diện người dùng)</li>
                <li>Back-end Developer (Xử lý logic, database, API)</li>
                <li>Full-stack Developer (Làm được cả Front-end và Back-end)</li>
            </ul>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Ngành này có dễ học không?</div>
            <div class = "contentInformation">Nó sẽ dễ bắt đầu nhưng sẽ khó về sau. Ngoài ra, ngành này không quá nặng về toàn, hoặc thuật toán như AI, Data Science hoặc Competitive Programming. Vì vậy muốn theo đuổi ngành này  thì phải kiên trì, trau dồi kiến thức và kĩ năng hàng ngày.</div>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Lộ trình học học:</div>
            <ul class = "listInformation">
                <li>Giai đoạn 1: Nền tảng
                    <ul class = "listChild">
                        <li>Học cách sử dụng git và vercel</li>
                        <li>Học cách sử dụng HTML, CSS, Responsive, UI/UX để tạo ra layout website.</li>
                    </ul>
                </li>
                <li>Giai đoạn 2: Front-end chuyên sâu
                    <ul class = "listChild">
                        <li>Học cách sử dụng javascript, API, React để tạo ra các logic cho trang web.</li>
                    </ul>
                </li>
                <li>Giai đoạn 3: Back-end
                    <ul class = "listChild">
                        <li>Học cách sử dụng Node.js/Java, Database (MySQL, MongoDB), Authentication để quản lý dữ liệu và bảo mật của trang web.</li>
                    </ul>
                </li>
                <li>Giai đoạn 4: Full project
                    <ul class = "listChild">
                        <li>Vận dụng những gì đã học để làm một project hoàn chỉnh.</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Cơ hội việc làm ra sao?</div>
            <ul class = "listInformation">
                <li>Rất cao vì: 
                    <ul class = "listChild">
                        <li>Hầu hết doanh nghiệp đều cần website</li>
                        <li>Xu hướng chuyển đổi số tăng mạnh</li>
                        <li>Startup, công ty outsource, product đều tuyển</li>
                    </ul>
                </li>
                <li>Ví dụ: Các công ty công nghệ lớn như FPT Software hay VNG đều có nhu cầu tuyển Web Developer thường xuyên.</li>
            </ul>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Đi làm có thể đảm nhận vai trò nào?</div>
            <ul class = "listInformation">
                <li>Front-end Developer</li>
                <li>Back-end Developer</li>
                <li>Full-stack Developer</li>
                <li> UI Developer</li>
                <li>Team Leader</li>
                <li>Tech Lead</li>
                <li>Project Manager</li>
                <li>Product Manager</li>
            </ul>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Mức lương của ngành lập trình web: <span>(Tại Việt Nam – tham khảo)</span></div>
            <ul class = "listInformation">
                <li> Intern: 2 – 5 triệu/tháng</li>
                <li>Fresher: 7 – 12 triệu/tháng</li>
                <li>Junior: 12 – 20 triệu/tháng</li>
                <li>Middle: 20 – 35 triệu/tháng</li>
                <li>Senior: 35 – 60 triệu+/tháng</li>
            </ul>
        </div>
    `,
    app: `
        <div class = "wrapInformation">
            <div class = "titleInformation">Ngành lập trình App là gì?</div>
            <div class = "contentInformation">Lập trình app là lĩnh vực phát triển ứng dụng chạy trên điện thoại (Android, iOS).</div>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Ngành lập trình App chia làm ba hướng chính:</div>
            <ul class = "listInformation">
                <li>Android Developer (Java / Kotlin)</li>
                <li>IOS Developer (Swift)</li>
                <li>Cross-platform Developer (Flutter, React Native)</li>
            </ul>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Ngành này học có dễ không?</div>
            <div class = "contentInformation">Ngành này sẽ khá khó để bắt đầu bởi nó cần khá cao về cấu hình desktop của bạn. Ngoài ra bạn phải hiểu được UI mobile, làm việc với thiết bị thật, quản lý tài nguyên máy (pin, camera, GPS,...). Nhưng bù lại nó cũng không quá nặng về toán. Vì vậy để theo đuổi ngành này bạn cần phải chăm chỉ, trâu dồi kỹ kiến thức và kĩ năng của bản thân hằng ngày.</div>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Lộ trình học:</div>
            <ul class = "listInformation">
                <li>Giai đoạn 1: Nền tảng
                    <ul class = "listChild">
                        <li>Học cách sử dụng git</li>
                        <li>Học ngôn ngữ Kotlin, Swift, Dart</li>
                        <li>Học về OOP (lập trình hướng đối tượng)</li>
                    </ul>
                </li>
                <li>Giai đoạn 2: UI & API
                    <ul class = "listChild">
                        <li>Thiết kế giao diện mobile</li>
                        <li>Kết nối API</li>
                        <li>State management</li>
                    </ul>
                </li>
                <li>Giai đoạn 3: Nâng cao
                    <ul class = "listChild">
                        <li>Firebase</li>
                        <li>Authentication</li>
                        <li>Push notification</li>
                        <li>Publish lên CH Play / App Store</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Cơ hội việc làm ra sao?</div>
            <ul class = "listInformation">
                <li>Rất cao vì: 
                    <ul class = "listChild">
                        <li>Startup</li>
                        <li>Công ty product</li>
                        <li>Công ty outsource</li>
                        <li>Làm freelance</li>
                    </ul>
                </li>
                <li>Hiện nhu cầu Mobile Dev vẫn cao, đặc biệt Flutter và React Native.</li>
            </ul>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Đi làm có thể đảm nhận vai trò nào?</div>
            <ul class = "listInformation">
                <li>Android Developer</li>
                <li>iOS Developer</li>
                <li>Flutter Developer</li>
                <li>Mobile Team Leader</li>
                <li>Tech Lead</li>
                <li>CTO (khi nhiều kinh nghiệm)</li>
            </ul>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Mức lương của ngành lập trình web: <span>(Tại Việt Nam – tham khảo)</span></div>
            <ul class = "listInformation">
                <li>Intern: 3 – 6 triệu/tháng</li>
                <li>Fresher: 8 – 14 triệu/tháng</li>
                <li>Junior:  14 – 25 triệu/tháng</li>
                <li>Middle: 25 – 40 triệu/tháng</li>
                <li>Senior: 40 – 70 triệu+/tháng</li>
            </ul>
        </div>
    `,
    design: `
        <div class = "wrapInformation">
            <div class = "titleInformation">Ngành Design trong IT là gì?</div>
            <div class = "contentInformation">Trong lĩnh vực IT, ngành Design sẽ là người thiết kế giao diện và trải nghiệm người dùng cho sản phẩm công nghệ như website, ứng dụng, phần mềm. Sau khi thiết kế xong chuyển cho Developer code.</div>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Trong IT, Design thường có hai hướng chính:</div>
            <ul class = "listInformation">
                <li>UI Design (Thiết kế giao diện)</li>
                <li>UX Design (Thiết kế trải nghiệm người dùng)</li>
            </ul>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Ngành này học có dễ không?</div>
            <div class = "contentInformation">Ngành này không yêu cầu bạn phải giỏi toán. Nhưng nó yêu cầu bạn phải có mắt thẩm mỹ tốt, tuy duy người dùng, và biết phân tích hành vi. Vì vậy nếu bạn thích sáng tạo trong công nghệ thì ngành này rất phù hợp với bạn.</div>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Lộ trình học:</div>
            <ul class = "listInformation">
                <li>Giai đoạn 1: Nền tảng
                    <ul class = "listChild">
                        <li>Màu sắc</li>
                        <li>Typography</li>
                        <li>Layout</li>
                        <li>Nguyên lý thiết kế</li>
                    </ul>
                </li>
                <li>Giai đoạn 2: Công cụ
                    <ul class = "listChild">
                        <li>Figma</li>
                        <li>Adobe XD</li>
                        <li>Photoshop</li>
                    </ul>
                </li>
                <li>Giai đoạn 3: UX nâng cao
                    <ul class = "listChild">
                        <li>User research</li>
                        <li>Wireframe</li>
                        <li>Prototype</li>
                        <li>Usability testing</li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Cơ hội việc làm ra sao?</div>
            <ul class = "listInformation">
                <li>Rất cao vì: 
                    <ul class = "listChild">
                        <li>Hầu hết công ty đều có website/app</li>
                        <li>Startup muốn sản phẩm đẹp để thu hút người dùng</li>
                        <li>Công ty product phải liên tục cải tiến trải nghiệm</li>
                    </ul>
                </li>
                <li>Ví dụ: Các công ty công nghệ lớn như VNG, FPT Software hay các nền tảng quốc tế như Airbnb đều có đội ngũ UI/UX riêng.</li>
            </ul>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Đi làm có thể đảm nhận vai trò nào?</div>
            <ul class = "listInformation">
                <li>UI Designer</li>
                <li>UX Designer</li>
                <li>Product Designer</li>
                <li>Design Lead</li>
                <li>Product Manager (nếu phát triển thêm kỹ năng)</li>
            </ul>
        </div>
        <div class = "wrapInformation">
            <div class = "titleInformation">Mức lương của ngành lập trình web: <span>(Tại Việt Nam – tham khảo)</span></div>
            <ul class = "listInformation">
                <li>Intern: 2 – 5 triệu/tháng</li>
                <li>Fresher: 7 – 12 triệu/tháng</li>
                <li>Junior:  12 – 20 triệu/tháng</li>
                <li>Middle: 20 – 35 triệu/tháng</li>
                <li>Senior: 35 – 60 triệu+/tháng</li>
            </ul>
        </div>
    `,
};

const blockInforCourses = document.querySelectorAll(".blockInforCourse");
blockInforCourses.forEach((blockInforCourse) => {
    blockInforCourse.addEventListener("click", () => {
        const courseId = blockInforCourse.dataset.id;
        const courseTitle = blockInforCourse.querySelector(".titleInforCourse").textContent;
        openModal({
            title: `Thông tin chi tiết về ${courseTitle}`,
            message: courseData[courseId],
        });
    });
});
