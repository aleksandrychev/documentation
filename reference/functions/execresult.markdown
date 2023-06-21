---
layout: default
title: execresult
published: true
---

[%CFEngine_function_prototype(command, shell, output)%]

**Description:** Execute `command` and return output (both `stdout` and `stderr`) as `string`.

If the command is not found, the result will be the empty string.

The `shell` argument decides whether a shell will be used to encapsulate the
command. This is necessary in order to combine commands with pipes etc, but
remember that each command requires a new process that reads in files beyond
CFEngine's control. Thus using a shell is both a performance hog and a
potential security issue.

The optional `output` argument allows you to select which output will be
included, betweeen `stdout`, `stderr`, or `both`. The default is `both`.

[%CFEngine_function_attributes(command, shell, output)%]

**Example:**

Prepare:

[%CFEngine_include_snippet(execresult.cf, #\+begin_src prep, .*end_src)%]
Policy:

[%CFEngine_include_snippet(execresult.cf, #\+begin_src cfengine3, .*end_src)%]

Output:

[%CFEngine_include_snippet(execresult.cf, #\+begin_src\s+example_output\s*, .*end_src)%]

**Notes:** you should never use this function to execute commands that
make changes to the system, or perform lengthy computations. Such an
operation is beyond CFEngine's ability to guarantee convergence, and
on multiple passes and during syntax verification these function calls
are executed, resulting in system changes that are **covert**. Calls
to `execresult` should be for discovery and information extraction
only.  Effectively calls to this function will be also repeatedly
executed by `cf-promises` when it does syntax checking, which is
highly undesirable if the command is expensive.  Consider using
`commands` promises instead, which have locking and are not evaluated
by `cf-promises`.

**See also:** [`returnszero()`][returnszero], [`execresult_as_data()`][execresult_as_data].

**History:**

* 3.0.5 Newlines no longer replaced with spaces in stored output.
* 3.17.0 Introduced optional parameter `output` added allowing selection of stderr, stdout or both.
