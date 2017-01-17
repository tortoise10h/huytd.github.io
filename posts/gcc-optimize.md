# Code optimization nó làm cái gì?

Khi làm việc với bất kì ngôn ngữ nào, chúng ta thường thấy sẽ có 2 chế độ build chạy chương trình khác nhau là: **Debug mode** và **Release mode**.

Khác biệt giữa 2 chế độ này là, khi build chương trình ở **Release mode**, compiler sẽ thực hiện một số phương pháp để tối ưu hóa code được sinh ra. 

Để hiểu được các phương pháp tối ưu hóa này hoạt động như thế nào, chúng ta hãy cùng xem qua một ví dụ đơn giản.

Sau đây là một đoạn chương trình C có nhiệm vụ tạo ra một biến `a` có giá trị ban đầu là `10`, chạy một vòng lặp `10` lần và liên tục cộng giá trị cho biến này, cuối cùng trả về kết quả là chính biến `a` đó:

```
int main() {
  int a = 10;
  for (int i = 0; i < 10; i++) {
    a++;
  }
  return a;
}
```

Thử biên dịch nó bằng `gcc` không kèm thêm bất cứ option nào ngoài `-S` để sinh ra Assembly code:

```
gcc -S main.c
```

Lệnh trên sinh ra file `main.s`, thử mở file này ra chúng ta thấy đoạn code sau:

```
	.section	__TEXT,__text,regular,pure_instructions
	.macosx_version_min 10, 12
	.globl	_main
	.align	4, 0x90
_main:                                  ## @main
	.cfi_startproc
## BB#0:
	pushq	%rbp
Ltmp0:
	.cfi_def_cfa_offset 16
Ltmp1:
	.cfi_offset %rbp, -16
	movq	%rsp, %rbp
Ltmp2:
	.cfi_def_cfa_register %rbp
	movl	$0, -4(%rbp)
	movl	$10, -8(%rbp)
	movl	$0, -12(%rbp)
LBB0_1:                                 ## =>This Inner Loop Header: Depth=1
	cmpl	$10, -12(%rbp)
	jge	LBB0_4
## BB#2:                                ##   in Loop: Header=BB0_1 Depth=1
	movl	-8(%rbp), %eax
	addl	$1, %eax
	movl	%eax, -8(%rbp)
## BB#3:                                ##   in Loop: Header=BB0_1 Depth=1
	movl	-12(%rbp), %eax
	addl	$1, %eax
	movl	%eax, -12(%rbp)
	jmp	LBB0_1
LBB0_4:
	movl	-8(%rbp), %eax
	popq	%rbp
	retq
	.cfi_endproc


.subsections_via_symbols
```

Khá phức tạp, chúng ta chỉ cần quan tâm tới phần nôi dung chính, là:

```
LBB0_1:                                 ## =>This Inner Loop Header: Depth=1
	cmpl	$10, -12(%rbp)
	jge	LBB0_4
```

Khởi tạo một vòng lặp, gọi là `LBB0_1`, chạy `10` 

## BB#2:                                ##   in Loop: Header=BB0_1 Depth=1
	movl	-8(%rbp), %eax
	addl	$1, %eax
	movl	%eax, -8(%rbp)
## BB#3:                                ##   in Loop: Header=BB0_1 Depth=1
	movl	-12(%rbp), %eax
	addl	$1, %eax
	movl	%eax, -12(%rbp)
	jmp	LBB0_1
LBB0_4:
	movl	-8(%rbp), %eax
	popq	%rbp
	retq
	.cfi_endproc
```
