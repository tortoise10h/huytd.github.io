# Nhân ma trận - Phần 2: Tính toán trên GPU

Sau khi viết xong [bài đầu tiên](https://huytd.github.io/posts/nhan-ma-tran.html), mình tiếp tục tìm hiểu sâu hơn về ma trận và cảm thấy cần phải viết thêm một (vài) bài nữa vì có quá nhiều thứ hay ho khi đi sâu vào.

Trong phần này, mình giới thiệu về phương pháp sử dụng GPU để thực hiện phép tính nhân 2 ma trận (GPU Calculation), thay cho việc dùng CPU truyền thống, để tăng tốc độ tính toán.

## Tại sao lại là GPU? có cả việc tính toán trên GPU sao?

Câu trả lời là có, thưa các bạn. Chúng ta đều biết GPU là một thành phần trong card đồ họa, thường được giới game thủ mua về cắm vô cho máy tính xử lý đồ họa nhanh hơn. Vậy thao tác xử lý đồ họa ở đây là gì? 

Để hiểu được chức năng của GPU, hãy cùng lái chủ đề một tí sang lĩnh vực đồ họa máy tính, viết đến đây mình thấy hơi bị máu vì dù đã từ bỏ ngành game được hơn 1 năm rồi nhưng giờ vẫn có cơ hội quay lại viết tiếp về nó, hê hê, lạc đề tí thôi, các bạn cũng yên tâm vì mình sẽ không để bài viết này thành bài hướng dẫn làm game gì đâu =)))

### Máy tính tạo ra hình ảnh như thế nào?

Một hình ảnh trên máy tính được cấu tạo thành từng pixel, điều này hẳn ai cũng biết, nhưng làm thế nào để máy tính hiểu và vẽ được một hình ảnh thành một tổ hợp các pixel đưa lên màn hình qua sự chỉ đạo của chương trình (application)?

![](http://ithare.com/wp-content/uploads/BB_part114_BookChapter014h_v3.png)
<center>_Nguồn: [http://ithare.com/game-graphics-101-rendering-pipeline/](http://ithare.com/game-graphics-101-rendering-pipeline/)_</center>

Trong trường hợp là game thì các dữ liệu hình ảnh (3d mesh, texture,...) sẽ được load từ đĩa (hard disk, file,...) và truyền vào GPU. Tại đây, GPU sẽ tiến hành phân tích và thực hiện những công việc tính toán cần thiết để chuyển chúng thành tập hợp các pixel gửi trả về CPU để vẽ ra màn hình máy tính (IO devices).

Quá trình tính toán đó ở trong GPU, được gọi là **Rendering Pipeline**, trong hình minh họa ở trên thì dây chuyền vận chuyển các khối hộp pixel kia chính là pipeline.

### Rendering Pipeline

Một vật thể 3D trong máy tính được cấu thành từ nhiều đỉnh, gọi là **vertex**, mảng các vertex được gọi là **vertices** array.

![](img/mesh_1.png)

Hình trên cho thấy một khối hộp được tạo từ mảng $v$ gồm các đỉnh `$v_{0}, v_{1}, \ldots, v_{7}$`

Trong máy tính, mọi hình ảnh từ đơn giản hay phức tạp đều được tạo thành từ các vertices như vậy.

![](img/mesh_2.png)

Render Pipeline là quá trình xảy ra trong GPU, khi nó nhận một tập hợp các vertices, trải qua các bước xử lý kết nối các vertices lại với nhau (vertex processing) thành các khối 3D cơ bản (thường là các khối tam giác, gọi là 3D primitives), sau đó phân tích (rasterization) các hình khối 3D này thành từng mảnh nhỏ (fragments), thực hiện việc tính toán tô màu, đổ bóng,... cho các khối này rồi ánh xạ nó thành mảng các pixel tương ứng với màn hình máy tính, gửi trả về CPU để đưa lên màn hình.

Vì quy trình này diễn ra liên tục với tốc độ cực kì cao để đảm bảo cho việc hiển thị hình ảnh lên màn hình diễn ra xuyên suốt và mượt mà, nên GPU phải làm việc với một khối lượng các phép tính cực kì lớn. Nói như vậy thì không có nghĩa là CPU không có khả năng dựng hình ảnh đồ họa trên máy tính, bản thân CPU cũng có thể làm được nhưng sẽ không đạt được performance như GPU, lý do tại sao xin mời các bạn xem tiếp.

### GPU vs CPU

Hình sau so sánh kiến trúc của một CPU so với một GPU:

![](img/cpuvsgpu1.png)

Các bạn có thể thấy khối tính toán của GPU nhiều hơn CPU rất nhiều lần, vì thế làm cho GPU có khả năng tính toán cao hơn CPU.

Thêm một hình ảnh nữa để so sánh sự lợi hại của GPU, nếu bạn có một máy tính có vi xử lý 4 nhân thì đây là sự khác biệt đối với GPU:

![](img/cpuvsgpu2.png)

Nhưng nếu sử dụng GPU lợi hại như vậy thì tại sao người ta không dùng GPU để thay thế CPU luôn? Câu trả lời là rất khó, vì việc debug trên GPU không đơn giản như với CPU, thêm nữa là GPU code chạy song song (parallel) nên cần phải có các phương pháp để phân vùng dữ liệu, liên lạc, đồng bộ hóa giữa các core nên các thuật toán xử lý trên GPU cực kì phức tạp.

Đoạn video sau đây minh họa sự khác biệt về việc dùng CPU và GPU để vẽ hình ảnh, con robot màu vàng là CPU còn cái máy bự chà bá kia là sức mạnh thực sự của một GPU.

<iframe width="700" height="400" src="https://www.youtube.com/embed/-P28LKWTzrI" frameborder="0" allowfullscreen></iframe>

### GPU chỉ dùng làm đồ họa?

Với sự phát triển của lĩnh vực công nghệ thông tin hiện nay, những công việc yêu cầu khả năng tính toán cực kì cao đã bắt đầu cần đến các hệ thống máy tính có khả năng xử lý mạnh hơn, và người ta đã bắt đầu tìm đến sự trợ giúp của các GPU trong công việc tính toán, không phải chỉ riêng CPU nữa.

Một ứng dụng thực tế có lẽ nhiều người biết đến nhất đó là việc sử dụng GPU để "đào" Bitcoin.

![](https://media.amazonwebservices.com/blog/2016/p2_cool_gpus_1.png)

Một ứng dụng khác thường thấy nữa là trong ngành Machine Learning, người ta thường sử dụng GPU để gia tăng tốc độ tính toán đối với các vector dữ liệu, vì đây cũng là một ngành phải xử lý với lượng dữ liệu cực kì lớn.

Gói EC2 P2 của AWS cũng hỗ trợ GPU [https://aws.amazon.com/blogs/aws/new-p2-instance-type-for-amazon-ec2-up-to-16-gpus/](https://aws.amazon.com/blogs/aws/new-p2-instance-type-for-amazon-ec2-up-to-16-gpus/)

## Tính toán với GPU bằng cách nào?

Có rất nhiều cách để sử dụng GPU làm công cụ tính toán, bạn có thể khởi tạo một ứng dụng đồ họa, chuyển đổi vector dữ liệu cần tính toán thành các ma trận texture rồi nạp vào GPU, viết các Shader program (là một dạng chương trình chạy trên GPU, trong quá trình fragment processing của rendering pipeline) để tính toán và trả dữ liệu về lại CPU.

Tuy nhiên cách làm trên khá là phức tạp và dư thừa (phải khởi tạo môi trường đồ họa, không cần thiết, và đó là cách làm thủ công, không có gì đảm bảo, và bị giới hạn bởi khả năng của Shader program. 

Ngày nay chúng ta có các giải pháp khác, có thể nói là "native" hơn, đó là **OpenCL** và **CUDA**.

### CUDA

Khi mới được ra mắt, **CUDA** là tên viết tắt của **Compute Unified Device Architecture** tuy nhiên về sau thì Nvidia bỏ hẳn tên gọi này.

**CUDA** là một nền tảng lập trình song song (parallel computing platform), cung cấp cho chúng ta các API trên các ngôn ngữ như C/C++, Fortran, và về sau còn xuất hiện thêm các wrapper cho Java, Ruby, Python, Haskell... để giao tiếp với các GPU của Nvidia và thực hiện công việc tính toán giống như trên CPU.

Quy trình hoạt động của một ứng dụng CUDA khá là giống với rendering pipeline:

![](img/cudaflow.png)

 1. Copy dữ liệu từ bộ nhớ chính vào bộ nhớ GPU
 2. CPU chỉ thị cho GPU thực hiện tính toán
 3. GPU thực hiện tính toán song song trên các core của nó
 4. Tính xong GPU gửi trả dữ liệu về lại cho bộ nhớ chính

CUDA có một vài nhược điểm nhất định, tuy nhiên điểm yếu lớn nhất của nó là được làm ra bởi Nvidia nên chỉ hỗ trợ chạy trên phần cứng của Nvidia, và không ai muốn công nghệ mình sử dụng lại bị phụ thuộc vào một hãng sản xuất nhất định nào hết (trừ trường hợp Apple =))) vậy cho nên người ta bắt đầu tìm đến một giải pháp tổng quát hơn, đó là **OpenCL**

### OpenCL

**Open Computing Language** viết tắt là **OpenCL** là một framework giúp các lập trình viên phát triển các ứng dụng mà chương trình có thể chạy được trên nhiều bộ xử lý như CPU, GPU, FPGA,...

![](img/opencl.png)

**OpenCL** là một chuẩn mở được Apple tạo ra và trao quyền phát triển cho tổ chức Khronos Group trứ danh (tổ chức đang nắm quyền phát triển OpenGL). **OpenCL** được rất nhiều hãng phần cứng hỗ trợ như là AMD, Apple, ARM, IBM, Imagination Technologies, Intel, Nvidia, Qualcomm, Samsung,... điều này khiến cho OpenCL trở thành một tiêu chuẩn chung cho cả ngành công nghiệp, giống như OpenGL vậy.

Và trong bài viết này chúng ta sẽ sử dụng OpenCL để implement thuật toán nhân ma trận trên GPU. Để có thể implement được thì đầu tiên phải tìm hiểu rõ hơn về OpenCL và cách lập trình sử dụng OpenCL.

## Lập trình GPU với OpenCL

Đầu tiên chúng ta cần hiểu các khái niệm sử dụng trong **OpenCL**.

### Các thuật ngữ trong OpenCL

Các thành phần tham gia việc tính toán trong một ứng dụng **OpenCL** là các **Compute Device**, gọi là các thiết bị tính toán. Và các thiết bị tính toán này có thể là các **CPU**, **GPU** hoặc các thiết bị khác có tính năng tương tự bên trong máy tính.

![](img/computedevice.png)

Trong mỗi một **Compute Device** chúng ta có nhiều **Compute Unit**, là các core bên trong nó.

![](img/computeunits.png)

Và trong mỗi **Compute Unit** (core) ta có nhiều **Processing Element** trực tiếp nhận lệnh để tính toán.

### Mô hình làm việc trong OpenCL

Mô hình xử lý của **OpenCL** gồm có một chương trình **Host** có nhiệm vụ điều khiển và liên lạc với nhiều **Compute Device** theo sơ đồ sau:

![](img/openclworkflow.png)

Khi thực hiện xử lý, **Host** sẽ khởi tạo trên mỗi **Compute Device** một **Context** chứa các thành phần như là: 
- Thông tin device đang chạy
- Kernel (là đơn vị nhỏ nhất của quá trình xử lý, như là một hàm)
- Program Object (là đoạn code implement của Kernel)
- Command Queues (là queue các lệnh được truyền vào device từ host)
- Memory Object (là đối tượng chứa dữ liệu sẽ được truyền/nhận qua lại giữa device và host)

Thao tác copy dữ liệu từ **Host** tới **Compute Device** gọi là thao tác **ghi** (writing), và thao tác copy dữ liệu ngược lại từ **Compute Device** về **Host** gọi là **đọc** (reading).

Đây là flow của một chương trình OpenCL thường thấy:

- **Bước 1:** Chọn device cần dùng (ví dụ như: Toàn bộ GPU)
- **Bước 2:** Khởi tạo context
- **Bước 3:** Khởi tạo Command Queue cho từng device
- **Bước 4:** Biên dịch chương trình
- **Bước 5:** Tạo các kernel từ chương trình
- **Bước 6:** Cấp phát bộ nhớ trên từng device
- **Bước 7:** Ghi dữ liệu vào memory object trên device
- **Bước 8:** Thực hiện xử lý các kernel trên device
- **Bước 9:** Gửi dữ liệu về lại host
- **Bước 10:** Giải phóng bộ nhớ trên device

Có thể thấy mô hình trên có phần phức tạp hơn **CUDA**. Nhưng làm việc với **OpenCL** linh hoạt hơn và không bị giới hạn về mặt thiết bị như **CUDA**.

Việc khởi động một **kernel** rất tốn kém, vì thế lời khuyên được đưa ra là nên thiết kế mỗi kernel làm nhiều việc nhất có thể.

## Implement một chương trình OpenCL đơn giản

## Implement thuật toán nhân ma trận trên GPU
