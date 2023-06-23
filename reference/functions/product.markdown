---
layout: default
title: product
published: true
---

[%CFEngine_function_prototype(list)%]

**Description:** Returns the product of the reals in `list`.

This function might be used for simple ring computation. Of course, you could
easily combine `product` with `readstringarray` or `readreallist` etc., to
collect summary information from a source external to CFEngine.

[This function can accept many types of data parameters.][Functions#collecting functions]

[%CFEngine_function_attributes(list)%]

**Example:**

[%CFEngine_include_snippet(product.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(product.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**History:** Was introduced in version 3.1.0b1,Nova 2.0.0b1 (2010). The [collecting function][Functions#collecting functions] behavior was added in 3.9.

**See also:** `sort()`, `variance()`, `sum()`, `max()`, `min()`, [about collecting functions][Functions#collecting functions], and `data` documentation.
