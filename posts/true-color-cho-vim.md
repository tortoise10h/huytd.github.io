# Thiết lập vim ở chế độ True color

Tuần vừa rồi mình và hội "VIM thủ" ở cộng đồng Ruby Việt Nam rủ nhau dành hẳn ra một tuần làm việc để ngồi cài VIM cùng mấy thứ đồ chơi linh tinh cho nó. Mặc dù kết quả rất khả quan là dến cuối tuần thì hầu như tất cả đã có được cho mình một bộ môi trường terminal hoàn hảo gồm có iTerm hoặc Cygwin chạy Tmux và VIM ở chế độ True Color, màu mè thì đẹp khỏi chê, có điều gần một tuần không làm ăn được gì cả =))

Quá trình cài đặt cũng không quá phức tạp, tuy nhiên nó khá là dài dòng và lôi thôi, lại có nhiều lỗi phát sinh tùy theo môi trường hiện hành của mỗi máy tính, vì thế mình viết bài này để lưu lại, phòng khi về sau máy móc có dở chứng thì cũng còn có thứ lấy ra tham khảo lại. Cũng tiện thể làm tài liệu hướng dẫn, dễ bề lôi kéo thêm nhiều bạn gia nhập vào hội cuồng terminal của bọn mình :v 

## VIM, Tmux là gì?

VIM là một trình soạn thảo văn bản trên giao diện dòng lệnh, thường được tích hợp sẵn trong các hệ điều hành unix-like như Linux hay OS X. Trên Windows cũng có thể cài đặt và sử dụng công cụ này nếu bạn thích. VIM là phiên bản mở rộng của trình soạn thảo `vi`. Sức mạnh của bộ editor này là tốc độ và khả năng tùy biến cao, cùng hệ sinh thái plugin đa dạng, nhờ đó bạn có thể làm được mọi việc với VIM mà không cần dùng đến các editor/IDE khác như Sublime, Atom hoặc WebStorm, RubyMine gì đó nữa.

Nghe có vẻ vô đối, nhưng thực ra đúng là như vậy đấy :trollface:

Đùa chút thôi, VIM có một đối thủ cạnh tranh khá nặng ký đó là EMACS, tuy nhiên, vì là thành viên hội cuồng VIM, mình xin không đưa ra bất cứ lời chỉ trích hay bình luận nào về cái thứ editor vừa khó chịu vừa phức tạp, tốn thời gian gõ bàn phím như EMACS kia. Các bạn không nhất thiết phải comment công kích EMACS thêm nữa đâu nhé :trollface:


