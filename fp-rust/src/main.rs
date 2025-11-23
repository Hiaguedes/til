fn foo(mut i: i32)  -> i32   {
    while i <= 99 {
        i += 1;

    }   

    i
}

fn foo_imutable(i: i32) -> i32 {
    if i > 99 {
        i
    } else {
        foo_imutable(i + 1)
    }
}

fn main() {
    let result: i32 = foo(0);
    println!("Result: {}", result);

    let result_imutable: i32 = foo_imutable(0);
    println!("Result imutable: {}", result_imutable);
}
