#include <stdio.h>
#include <string.h>

int main(void)
{
    int test1 = "Cat" || "Dog";
    int test2 = "Cat" && 0;

    printf("%d\n", test1);
    printf("%d\n", test2);

    return 0;
}
