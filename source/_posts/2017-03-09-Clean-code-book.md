---
title: Clean code book
date: 2017-03-09 15:23:12
tags: [book]
---

# Clean code book

这本书写给真正相当good programmer,在乎code的人。很多大牛讲了心目中的clean code的标准，印象深的是really care。工匠精神，craftsmanship.clean code: readability, written well, short, straightforward, easy to maintain.

<!--more-->

## Meaningful Name
> Principle: Reveal intend. why it exists, what it does and how it is used.
> Say what you mean. Mean what you say.

*Avoid Disinformation*
Don't include the type in name, avoid like `hp`.

*Distinguish Names*
Avoid to use Info, Object, Data... , no a/the.

Like there are no much differences in followings:
```Java
getActiveAccount();
getActiveAccounts();
getActiveAccountInfo();
```

*Pronounceable Name*
`genymdhms` compare to `generationTimestamp`

*Searchable Names*

*Avoid Encoding*

*No member prefix*
As people will ignore them.

*Avoid Mental Mapping*

*Noun Class Names, Verb Method Names*

*Pick One word per Concept, no pun*

*Use Solution Domain, Problem Domain Names*

## Functions

*Small, blocks and indent should be 1 or 2*

*Functions should do one thing*
