<template>
  <input
    ref="readerEl"
    style="display: none; width: 0; height: 0;"
    type="file"
    accept=".jpg, .jpeg, .bmp"
  />
</template>

<script>
export default {
  name: "imageBase64Reader",
  methods: {
    async imageReaderFunc(maxImageSizeMb = undefined) {
      let el = this.$refs.readerEl;
      //using promise ,waitting img->base64 process done.
      let readImgPromise = new Promise((resolve, reject) => {
        el.addEventListener("change", (e) => {
          if (e.target.files != undefined) {
            //   check image size
            if (e.target.files[0].size > maxImageSizeMb * 1024 * 1024)
              resolve(undefined);

            console.log("test image mb", e.target.files, maxImageSizeMb);
            let _reader = new FileReader();
            _reader.onload = (e) => {
              resolve(e.target.result);
            };
            _reader.readAsDataURL(e.target.files[0]);
          } else {
            reject();
          }
        });
      });

      el.click();
      return await readImgPromise;
    },
  },
};
</script>

<style>
</style>