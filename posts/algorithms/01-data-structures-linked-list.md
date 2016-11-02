# Linked List

## Overview

Linked List:
- is a linear **collection of data elements**
- each element called a **node**
- nodes a **linked** to each other
- each node is composed by a **data** and a **reference (link)** to a next node in sequence
- A **node** will be defined in **Heap** memory, but the **Head** (pointer to the first node) will be stored in **Stack**

![](../img/linkedlistmemory.png)

<div class="box-orange" style="padding: 15px">
**Side Note**<br/>
<hr/>
Both of **Stack** and **Heap** are stored in computer's RAM.<br/><br/>
- **Stack:** is used for static memory allocation during compiling. Value of stack are stored directly to the memory and access to this memory is very fast.<br/>
- **Heap:** is used for dynamic memory allocation during run time. Access to this memory is a bit slower but the Heap size only limited by the size of virtual memory.<br/>
<br/>
Use stack if you know exactly how much data you need to allocate before compile and it's not too big. Use heap if you don't.
</div>

## Pros and Cons

Pros:
- allows **efficient insertion and removal** of elements from any position in sequence **during iteration**
- can be used to implement other common data types such as **list**, **stack**, **queue**, **associative array**,...

Cons:
- has no [cache locality](https://github.com/unrealhoang/hardcore/blob/master/cache_locality/post.md) since the elements are not contiguosly
- difficult in **reverse travelling** linked list

## Comparision with Array

Linked List vs. Array:
- linked list elements can easily be inserted or removed **without reallocation or reorganization** of the entrie data structure, because data items **need not to be stored contiguosly in memory**

![](http://www.programcreek.com/wp-content/uploads/2013/03/arraylist-vs-linkedlist-complexity.png)

- therefore, **no random access** on linked list (index). need to scan the list all the time.
- linked list can be allocating or deallocating in **runtime**, array is allocated in **compiling time**
- no need to define an **initial size** for linked list
- used **more memory** than array because of pointers

## Different Linked List Types

### Singly Linked List

### Doubly Linked List

### Multiply Linked List

### Circular Linked List

## Solving Linked List Problems
