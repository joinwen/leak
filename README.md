## leak
### install
```
npm install leak --save
```
### usage

- #### 1. set
```
leak.set("wen", 25);
leak.set("wen", 25, 5000);  // 25 just exist 5s
```
- #### 2. get
```
leak.get("wen"); // 25
```
- #### 3. remove
```
leak.remove(“wen");
```
- #### 4. clear
```
leak.clear();
```
- #### 5. on
```
leak.on("wen", (e) => console.log(e));
leak.set("wen", 25);    // {oldValue: undefined, newValue: 24}
leak.set("wen", 26);    // {oldValue: 25, newValue: 26}
```
- #### 6. off
```
leak.off("wen");
leak.set("wen", 26); // nothing happend
```
