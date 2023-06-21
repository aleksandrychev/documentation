---
layout: default
title: sum
published: true
---

[%CFEngine_function_prototype(list)%]

**Description:** Return the sum of the reals in `list`.

[This function can accept many types of data parameters.][Functions#collecting functions]

This function might be used for simple ring computation. Of course, you could
easily combine `sum` with `readstringarray` or `readreallist` etc., to collect
summary information from a source external to CFEngine.

[%CFEngine_function_attributes(list)%]

**Example:**

[%CFEngine_include_snippet(sum.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(sum.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

Because `$(six)` and `$(zero)` are both real numbers, the report that is
generated will be:

```
six is 6.000000, zero is 0.000000
```

**Notes:**

**History:** Was introduced in version 3.1.0b1,Nova 2.0.0b1 (2010). The [collecting function][Functions#collecting functions] behavior was added in 3.9.

**See also:** `product()`, [about collecting functions][Functions#collecting functions], and `data` documentation.
