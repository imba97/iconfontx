import { expect, it } from 'vitest'

import { getClassFile } from '../src/request'
import { generateFontBase64 } from '../src/font'

it('generate font', async () => {
  const content = await getClassFile('//at.alicdn.com/t/c/font_3985119_pdodg4bwte9.css')
  const result = await generateFontBase64(content)

  expect(result).toMatchInlineSnapshot(`"d09GRgABAAAAAARIAAsAAAAABrgAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADsAAABUIIslek9TLzIAAAFEAAAARAAAAGA9M0nuY21hcAAAAYgAAABLAAABcOhGuQRnbHlmAAAB1AAAAJYAAACw6K1wbGhlYWQAAAJsAAAALQAAADYjsd/FaGhlYQAAApwAAAAcAAAAJAfeA4NobXR4AAACuAAAAAgAAAAICAAAAGxvY2EAAALAAAAABgAAAAYAWAAAbWF4cAAAAsgAAAAeAAAAIAENAEluYW1lAAAC6AAAAUAAAAJnEKM8sHBvc3QAAAQoAAAAIAAAADHY6c97eJxjYGRgYOBiMGCwY2BycfMJYeDLSSzJY5BiYGGAAJA8MpsxJzM9kYEDxgPKsYBpDiBmg4gCACY7BUgAeJxjYGFhYJzAwMrAwNTJdIaBgaEfQjO+ZjBi5ACKMrAyM2AFAWmuKQwHnss9l2Nu+N/AwMB8hwFIMjCiKGICAGmHDJ54nGNgYGBlYGBgBmIdIGZhYGAMYWBkAAE/oCgjWJyZgQsszsKgBFbDAhJ/Lvf/P4wE8lnAJAMjG8Mo4AGTMlAeOKwgmIERAHS8CeUAeJxjYGQAAuYEpgcMNgwMjEpsoiLsbOxsSupq6mom5mbmZsZGYuLKSmwiYtaMRma2jCZqSmyyjHqMykogZSLiYuJiRiBlpiZqzA68wurqjs5znB3V1UEMP8NY9VBeYWHeBUBCSli/xDY+2F/fwEDfP3gfiCHM2CDM6wdTDdamKA9UCNHAG6iuBVcKYsTzCjMwAAAEkB5cAAB4nGNgZGBgAOLDt2XOxvPbfGXgZmEAgQeeZ78g0ywMTA+AFAcDE4gHAEyGCvwAAAB4nGNgZGBgbvjfwBDDwgACQJKRARUwAQBHCAJrBAAAAAQAAAAAAAAAAFgAAHicY2BkYGBgYrBlANEgFgMDFxAyMPwH8xkADowBVwAAeJyFkT1uwkAQhZ/BkASUKEqkNGlWKSgSyfyUSKlQoKegB7PmR7bXWi9I1DlNjpAT5AjpaHOKSHnYQwNFvNrZb96+mR3JAO6wh4fyu+cu2cMls5IruMCjcJX6k7BPfhauoYmecJ36q3ADL3gTbrJjxg6ef8WshXdhD7f4EK7gBp/CVepfwj75W7iGB/wI16n/Cjcw8a6Fm2h54cDqqdNzNdupVWjSyKTueI71YhNP7ak80TZfmVR1g85RGulU22ObfLvoORepyJpEDXmr49iozJq1Dl2wdC7rt9uR6EFoEgxgoTGFY5xDYYYd4wohDFJERXRn+ZjuBTaIWWn/dU/otsipH3KFLgJ0zlwjutLCeTpNji1f61F1dCtuy5qENJRazUlisuIPPNytqYTUAyyLqgx9tLmiE39QzJD8AdiTb1d4nGNgYoAALgbsgImRiZGZgb0oNa0otTiDgQEAFIADDA=="`)
})